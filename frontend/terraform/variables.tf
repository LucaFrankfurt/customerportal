variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region for resources"
  type        = string
  default     = "us-central1"
}

variable "bucket_location" {
  description = "Location for Cloud Storage bucket (US, EU, ASIA, or specific region)"
  type        = string
  default     = "US"
}

variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
  default     = "production"

  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "customer-portal"
}

variable "domain_names" {
  description = "Custom domain names for the load balancer"
  type        = list(string)
  default     = []
}

variable "dns_zone_name" {
  description = "Cloud DNS managed zone name for DNS records"
  type        = string
  default     = ""
}

variable "enable_cloud_armor" {
  description = "Enable Cloud Armor security policies"
  type        = bool
  default     = true
}

variable "rate_limit_threshold" {
  description = "Rate limit threshold (requests per minute per IP)"
  type        = number
  default     = 100
}

variable "enable_ddos_protection" {
  description = "Enable adaptive DDoS protection in Cloud Armor"
  type        = bool
  default     = true
}

variable "blocked_countries" {
  description = "List of country codes to block (e.g., ['CN', 'RU'])"
  type        = list(string)
  default     = []
}

variable "labels" {
  description = "Additional labels for all resources"
  type        = map(string)
  default     = {}
}

variable "backend_api_url" {
  description = "Backend API URL for frontend configuration"
  type        = string
  default     = ""
}
