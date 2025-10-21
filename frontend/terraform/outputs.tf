output "bucket_name" {
  description = "Name of the Cloud Storage bucket hosting the frontend"
  value       = google_storage_bucket.frontend.name
}

output "bucket_url" {
  description = "URL of the Cloud Storage bucket"
  value       = google_storage_bucket.frontend.url
}

output "load_balancer_ip" {
  description = "External IP address of the load balancer"
  value       = google_compute_global_address.frontend.address
}

output "backend_bucket_name" {
  description = "Name of the backend bucket"
  value       = google_compute_backend_bucket.frontend.name
}

output "ssl_certificate_id" {
  description = "ID of the managed SSL certificate (if using custom domain)"
  value       = length(var.domain_names) > 0 ? google_compute_managed_ssl_certificate.frontend[0].id : null
}

output "website_url" {
  description = "URL to access the frontend"
  value       = length(var.domain_names) > 0 ? "https://${var.domain_names[0]}" : "http://${google_compute_global_address.frontend.address}"
}

output "cloud_armor_policy_id" {
  description = "ID of the Cloud Armor security policy (if enabled)"
  value       = var.enable_cloud_armor ? google_compute_security_policy.frontend[0].id : null
}

output "deployment_instructions" {
  description = "Instructions for deploying the frontend"
  value = <<-EOT
    To deploy the frontend to this infrastructure:
    
    1. Build the frontend:
       cd /Users/luca/Documents/Customer\ Portal\ 4/frontend
       npm run build
    
    2. Upload to Cloud Storage:
       gsutil -m rsync -r -d dist/ gs://${google_storage_bucket.frontend.name}/
    
    3. Set cache headers for index.html:
       gsutil setmeta -h "Cache-Control:public, max-age=0, must-revalidate" gs://${google_storage_bucket.frontend.name}/index.html
    
    4. Clear CDN cache:
       gcloud compute url-maps invalidate-cdn-cache ${google_compute_url_map.frontend.name} --path "/*"
    
    5. Access your site:
       ${length(var.domain_names) > 0 ? "https://${var.domain_names[0]}" : "http://${google_compute_global_address.frontend.address}"}
  EOT
}
