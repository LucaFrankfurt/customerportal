# Customer Portal Frontend - Terraform Infrastructure (GCP)

This directory contains Terraform configuration to deploy the Customer Portal frontend to Google Cloud Platform using Cloud Storage + Cloud CDN.

## Architecture

```
┌─────────────┐
│   Users     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Cloud DNS   │ (Optional)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Cloud Armor  │ Security Policy
│   (WAF)     │ DDoS Protection
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  HTTPS/HTTP │ Global Load Balancer
│Load Balancer│ SSL Termination
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Cloud CDN  │ Global caching
│ Backend     │ Compression
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Cloud Storage│ Static website hosting
│   Bucket    │ React build artifacts
└─────────────┘
```

## Prerequisites

1. **GCP Account** with billing enabled
2. **gcloud CLI** configured (`gcloud auth login`)
3. **Terraform** >= 1.0 installed
4. **Node.js** 18+ for building the frontend
5. **(Optional)** Custom domain and Cloud DNS zone

## Quick Start

### 1. Initialize Terraform

```bash
cd frontend/terraform
terraform init
```

### 2. Configure Variables

```bash
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your settings
```

### 3. Plan Infrastructure

```bash
terraform plan
```

### 4. Apply Infrastructure

```bash
terraform apply
```

### 5. Build and Deploy Frontend

```bash
# Build the frontend
cd ..
npm run build

# Get S3 bucket name from Terraform output
BUCKET_NAME=$(cd terraform && terraform output -raw s3_bucket_name)
DISTRIBUTION_ID=$(cd terraform && terraform output -raw cloudfront_distribution_id)

# Sync to S3
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"
```

## Configuration Options

### Basic Configuration

```hcl
project_id      = "your-gcp-project-id"
region          = "us-central1"
bucket_location = "US"
environment     = "production"
project_name    = "customer-portal"
```

### Custom Domain Setup

```hcl
domain_names  = ["portal.example.com", "www.portal.example.com"]
dns_zone_name = "example-com"  # Cloud DNS zone name
```

**Important**: Managed SSL certificates are automatically provisioned by GCP. Domain must be verified and DNS must point to the load balancer IP before certificate is issued.

### Cloud CDN Coverage

Cloud CDN automatically uses Google's global network of edge locations across all continents for optimal performance worldwide.

### Cloud Armor Security Configuration

```hcl
enable_cloud_armor     = true
rate_limit_threshold   = 100  # Requests per minute per IP
enable_ddos_protection = true
blocked_countries      = ["CN", "RU"]  # Optional country blocking
```

Includes:
- Adaptive DDoS protection
- XSS and SQL injection prevention
- Rate limiting per IP
- Geographic blocking (optional)
- Custom security rules

## Terraform Commands

```bash
# Initialize
terraform init

# Validate configuration
terraform validate

# Plan changes
terraform plan

# Apply changes
terraform apply

# Show outputs
terraform output

# Destroy infrastructure
terraform destroy
```

## Deployment Script

Create a deployment script for easier updates:

```bash
#!/bin/bash
# deploy.sh

set -e

echo "Building frontend..."
npm run build

echo "Getting Terraform outputs..."
cd terraform
BUCKET_NAME=$(terraform output -raw s3_bucket_name)
DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
cd ..

echo "Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html" \
  --exclude "*.json"

aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --exclude "*" \
  --include "index.html" \
  --include "*.json" \
  --cache-control "public, max-age=0, must-revalidate"

echo "Creating CloudFront invalidation..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
echo "URL: $(cd terraform && terraform output -raw website_url)"
```

## State Management

### Remote State Backend

Update `main.tf` backend configuration:

```hcl
terraform {
  backend "gcs" {
    bucket = "your-terraform-state-bucket"
    prefix = "customer-portal/frontend"
  }
}
```

Create the state bucket:

```bash
gsutil mb gs://your-terraform-state-bucket
gsutil versioning set on gs://your-terraform-state-bucket
```

## Cost Optimization

### Estimated Monthly Costs (Low Traffic)

| Service | Usage | Cost |
|---------|-------|------|
| Cloud Storage | 1 GB | $0.02 |
| Cloud CDN | 10 GB NA/EU | $0.80 |
| Load Balancer | 1 forwarding rule | $18.00 |
| Cloud Armor | 1M requests | $1.00 |
| Cloud DNS | 1 zone | $0.20 |
| **Total** | | **~$20/month** |

**Note**: Load balancer has a minimum monthly charge. For very low-traffic sites, consider using Firebase Hosting or Cloud Storage website hosting without load balancer.

### Cost Reduction Tips

1. Use Cloud Storage website mode for dev environments (no load balancer)
2. Enable Cloud CDN cache-everything mode
3. Set long cache TTLs for static assets
4. Disable Cloud Armor in non-production environments
5. Use regional bucket locations for region-specific apps
6. Consider Firebase Hosting for lower-traffic sites ($0.15/GB)

## Security Best Practices

1. ✅ Cloud Storage bucket with IAM (public read for web objects)
2. ✅ HTTPS enforced (automatic redirect HTTP to HTTPS)
3. ✅ Cloud Armor protection with managed rules
4. ✅ Adaptive DDoS protection
5. ✅ Rate limiting per IP
6. ✅ TLS 1.2+ only (via managed SSL certificates)
7. ✅ Encryption at rest (default on GCP)
8. ✅ Versioning enabled for rollback capability

## Monitoring

### Cloud Monitoring Metrics

Load Balancer and Cloud CDN automatically provide:
- Request count and rate
- Bytes served
- Error rates (4xx, 5xx)
- Cache hit ratio
- Backend latency
- SSL certificate expiration

### Cloud Armor Metrics

- Allowed/denied requests
- Security policy rule matches
- DDoS events detected
- Rate limit violations

### Logging

```bash
# View load balancer logs
gcloud logging read "resource.type=http_load_balancer" --limit 50

# View Cloud Armor security events
gcloud logging read "resource.type=http_load_balancer AND jsonPayload.enforcedSecurityPolicy.name!=\"\"" --limit 20
```

### Alerts (Optional)

Set up Cloud Monitoring alerts for:
- High error rates (4xx/5xx)
- Unusual traffic patterns
- Security policy violations
- SSL certificate expiration

## Troubleshooting

### CDN Cache Not Updating

```bash
# Invalidate CDN cache for specific path
gcloud compute url-maps invalidate-cdn-cache URL_MAP_NAME --path "/index.html"

# Invalidate everything
gcloud compute url-maps invalidate-cdn-cache URL_MAP_NAME --path "/*"
```

### SSL Certificate Issues

- Managed certificates require DNS pointing to load balancer IP first
- Certificate provisioning can take up to 24 hours
- Verify domain ownership in Cloud DNS
- Check certificate status: `gcloud compute ssl-certificates describe CERT_NAME`

### Cloud Armor Blocking Legitimate Traffic

```bash
# Temporarily disable Cloud Armor
terraform apply -var="enable_cloud_armor=false"

# Or increase rate limit
terraform apply -var="rate_limit_threshold=500"

# View blocked requests
gcloud logging read "resource.type=http_load_balancer AND jsonPayload.enforcedSecurityPolicy.outcome=\"DENY\""
```

### Storage Access Issues

Check:
1. Bucket IAM policy allows `allUsers` as `roles/storage.objectViewer`
2. Objects are uploaded with correct permissions
3. Backend bucket is correctly configured
4. CORS settings allow browser access

### Load Balancer Not Responding

```bash
# Check backend health
gcloud compute backend-buckets describe BACKEND_NAME

# View load balancer logs
gcloud logging read "resource.type=http_load_balancer" --limit 10

# Test direct bucket access
gsutil ls gs://BUCKET_NAME/
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy Frontend to GCP

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Build
        run: |
          cd frontend
          npm ci
          npm run build
      
      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v1
        with:
          workload_identity_provider: ${{ secrets.WIF_PROVIDER }}
          service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}
      
      - name: Setup Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
      
      - name: Deploy to Cloud Storage
        run: |
          gsutil -m rsync -r -d frontend/dist/ gs://${{ secrets.GCS_BUCKET }}/
          gsutil setmeta -h "Cache-Control:public, max-age=0, must-revalidate" \
            gs://${{ secrets.GCS_BUCKET }}/index.html
      
      - name: Invalidate CDN Cache
        run: |
          gcloud compute url-maps invalidate-cdn-cache ${{ secrets.URL_MAP_NAME }} \
            --path "/*" || true
```

### Using Service Account Key (Alternative)

```yaml
      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}
```

## Cleanup

To remove all infrastructure:

```bash
terraform destroy
```

**Warning**: This will permanently delete:
- Cloud Storage bucket and all contents
- Load balancer and forwarding rules
- SSL certificates
- Cloud Armor security policies
- Cloud DNS records
- Static IP address

**Note**: If `force_destroy = false` on the bucket, you must manually empty it first:
```bash
gsutil -m rm -r gs://BUCKET_NAME/**
```

## Common Commands

```bash
# List all buckets
gsutil ls

# View bucket contents
gsutil ls -r gs://BUCKET_NAME/

# Check load balancer status
gcloud compute forwarding-rules list

# View SSL certificate status
gcloud compute ssl-certificates list

# Monitor logs in real-time
gcloud logging tail "resource.type=http_load_balancer"

# Check Cloud Armor policy
gcloud compute security-policies describe POLICY_NAME
```

## Support

For issues or questions:
1. Check Terraform plan output
2. Review Cloud Logging
3. Verify IAM permissions and API enablement
4. Check GCP quotas: `gcloud compute project-info describe --project=PROJECT_ID`
5. GCP Documentation: https://cloud.google.com/docs

## License

MIT
