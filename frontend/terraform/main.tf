terraform {
  required_version = ">= 1.0"
  
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    # Configure this with your actual GCS bucket for state storage
    # bucket = "your-terraform-state-bucket"
    # prefix = "customer-portal/frontend"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

# Cloud Storage bucket for static website hosting
resource "google_storage_bucket" "frontend" {
  name          = "${var.project_name}-frontend-${var.environment}"
  location      = var.bucket_location
  force_destroy = false
  
  uniform_bucket_level_access = true
  
  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "OPTIONS"]
    response_header = ["*"]
    max_age_seconds = 3600
  }

  versioning {
    enabled = true
  }

  labels = {
    project     = var.project_name
    environment = var.environment
    managed_by  = "terraform"
  }
}

# Make bucket objects publicly readable
resource "google_storage_bucket_iam_member" "frontend_public" {
  bucket = google_storage_bucket.frontend.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Reserve a static external IP address
resource "google_compute_global_address" "frontend" {
  name = "${var.project_name}-frontend-ip-${var.environment}"
}

# Create a managed SSL certificate (if using custom domain)
resource "google_compute_managed_ssl_certificate" "frontend" {
  count = length(var.domain_names) > 0 ? 1 : 0
  
  name = "${var.project_name}-frontend-cert-${var.environment}"

  managed {
    domains = var.domain_names
  }
}

# Cloud CDN backend bucket
resource "google_compute_backend_bucket" "frontend" {
  name        = "${var.project_name}-frontend-backend-${var.environment}"
  bucket_name = google_storage_bucket.frontend.name
  enable_cdn  = true

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    client_ttl        = 3600
    default_ttl       = 3600
    max_ttl           = 86400
    negative_caching  = true
    serve_while_stale = 86400

    # Cache static assets longer
    cache_key_policy {
      include_host         = true
      include_protocol     = true
      include_query_string = false
    }
  }

  custom_response_headers = [
    "X-Content-Type-Options: nosniff",
    "X-Frame-Options: SAMEORIGIN",
    "X-XSS-Protection: 1; mode=block"
  ]
}

# URL map for routing
resource "google_compute_url_map" "frontend" {
  name            = "${var.project_name}-frontend-url-map-${var.environment}"
  default_service = google_compute_backend_bucket.frontend.id

  host_rule {
    hosts        = length(var.domain_names) > 0 ? var.domain_names : ["*"]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_bucket.frontend.id
  }
}

# HTTPS target proxy
resource "google_compute_target_https_proxy" "frontend" {
  name             = "${var.project_name}-frontend-https-proxy-${var.environment}"
  url_map          = google_compute_url_map.frontend.id
  ssl_certificates = length(var.domain_names) > 0 ? [google_compute_managed_ssl_certificate.frontend[0].id] : []

  depends_on = [google_compute_managed_ssl_certificate.frontend]
}

# HTTP target proxy (redirect to HTTPS)
resource "google_compute_target_http_proxy" "frontend" {
  name    = "${var.project_name}-frontend-http-proxy-${var.environment}"
  url_map = google_compute_url_map.frontend_redirect.id
}

# URL map for HTTP to HTTPS redirect
resource "google_compute_url_map" "frontend_redirect" {
  name = "${var.project_name}-frontend-redirect-${var.environment}"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

# Global forwarding rule for HTTPS
resource "google_compute_global_forwarding_rule" "frontend_https" {
  name                  = "${var.project_name}-frontend-https-${var.environment}"
  target                = google_compute_target_https_proxy.frontend.id
  port_range            = "443"
  ip_address            = google_compute_global_address.frontend.address
  load_balancing_scheme = "EXTERNAL"
}

# Global forwarding rule for HTTP (redirect)
resource "google_compute_global_forwarding_rule" "frontend_http" {
  name                  = "${var.project_name}-frontend-http-${var.environment}"
  target                = google_compute_target_http_proxy.frontend.id
  port_range            = "80"
  ip_address            = google_compute_global_address.frontend.address
  load_balancing_scheme = "EXTERNAL"
}

# Cloud DNS managed zone (if using custom domain)
data "google_dns_managed_zone" "frontend" {
  count = var.dns_zone_name != "" ? 1 : 0
  name  = var.dns_zone_name
}

# DNS A record pointing to load balancer IP
resource "google_dns_record_set" "frontend" {
  count = var.dns_zone_name != "" && length(var.domain_names) > 0 ? length(var.domain_names) : 0

  name         = "${var.domain_names[count.index]}."
  managed_zone = data.google_dns_managed_zone.frontend[0].name
  type         = "A"
  ttl          = 300

  rrdatas = [google_compute_global_address.frontend.address]
}

# Cloud Armor security policy (optional)
resource "google_compute_security_policy" "frontend" {
  count = var.enable_cloud_armor ? 1 : 0

  name        = "${var.project_name}-frontend-armor-${var.environment}"
  description = "Security policy for Customer Portal frontend"

  # Default rule - allow traffic
  rule {
    action   = "allow"
    priority = 2147483647
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default rule"
  }

  # Rate limiting rule
  rule {
    action   = "rate_based_ban"
    priority = 1000
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    rate_limit_options {
      conform_action = "allow"
      exceed_action  = "deny(429)"
      enforce_on_key = "IP"
      rate_limit_threshold {
        count        = var.rate_limit_threshold
        interval_sec = 60
      }
      ban_duration_sec = 600
    }
    description = "Rate limiting rule"
  }

  # Block common attack patterns
  rule {
    action   = "deny(403)"
    priority = 2000
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('xss-stable')"
      }
    }
    description = "Block XSS attacks"
  }

  rule {
    action   = "deny(403)"
    priority = 3000
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('sqli-stable')"
      }
    }
    description = "Block SQL injection"
  }

  # Block specific countries (optional)
  dynamic "rule" {
    for_each = length(var.blocked_countries) > 0 ? [1] : []
    content {
      action   = "deny(403)"
      priority = 4000
      match {
        expr {
          expression = "origin.region_code in ${jsonencode(var.blocked_countries)}"
        }
      }
      description = "Block traffic from specific countries"
    }
  }

  adaptive_protection_config {
    layer_7_ddos_defense_config {
      enable = var.enable_ddos_protection
    }
  }
}

# Attach Cloud Armor policy to backend bucket
resource "google_compute_backend_bucket" "frontend_with_armor" {
  count = var.enable_cloud_armor ? 1 : 0

  name        = "${var.project_name}-frontend-backend-armor-${var.environment}"
  bucket_name = google_storage_bucket.frontend.name
  enable_cdn  = true

  security_policy = google_compute_security_policy.frontend[0].id

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    client_ttl        = 3600
    default_ttl       = 3600
    max_ttl           = 86400
    negative_caching  = true
    serve_while_stale = 86400
  }
}
