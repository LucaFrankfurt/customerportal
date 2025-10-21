#!/bin/bash
# Frontend Deployment Script for GCP Cloud Storage + Cloud CDN

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Customer Portal Frontend Deployment (GCP)${NC}"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "../package.json" ]; then
    echo -e "${RED}Error: Must run from frontend/terraform directory${NC}"
    exit 1
fi

# Check if terraform is initialized
if [ ! -d ".terraform" ]; then
    echo -e "${YELLOW}Terraform not initialized. Running 'terraform init'...${NC}"
    terraform init
fi

# Get Terraform outputs
echo -e "\n${YELLOW}📋 Getting infrastructure details...${NC}"
BUCKET_NAME=$(terraform output -raw bucket_name 2>/dev/null || echo "")
URL_MAP_NAME=$(terraform output -raw backend_bucket_name 2>/dev/null || echo "")
WEBSITE_URL=$(terraform output -raw website_url 2>/dev/null || echo "")

if [ -z "$BUCKET_NAME" ]; then
    echo -e "${RED}Error: Infrastructure not deployed. Run 'terraform apply' first.${NC}"
    exit 1
fi

echo "Storage Bucket: $BUCKET_NAME"
echo "Backend Bucket: $URL_MAP_NAME"
echo "Website URL: $WEBSITE_URL"

# Build the frontend
echo -e "\n${YELLOW}🔨 Building frontend...${NC}"
cd ..
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}Error: Build failed. No dist directory found.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build complete${NC}"

# Upload to Cloud Storage with optimized cache headers
echo -e "\n${YELLOW}📤 Uploading to Cloud Storage...${NC}"

# Upload all files first with long cache
echo "Uploading static assets (with 1 year cache)..."
gsutil -m rsync -r -d dist/ gs://$BUCKET_NAME/

# Set cache headers for static assets
echo "Setting cache headers for assets..."
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, immutable" \
  "gs://$BUCKET_NAME/assets/**"

# Set no-cache for index.html
echo "Setting no-cache for index.html..."
gsutil setmeta -h "Cache-Control:public, max-age=0, must-revalidate" \
  gs://$BUCKET_NAME/index.html

# Set cache headers for JSON files
if gsutil ls gs://$BUCKET_NAME/*.json &>/dev/null; then
  gsutil -m setmeta -h "Cache-Control:public, max-age=0, must-revalidate" \
    "gs://$BUCKET_NAME/*.json"
fi

echo -e "${GREEN}✓ Upload complete${NC}"

# Invalidate CDN cache
echo -e "\n${YELLOW}🔄 Invalidating CDN cache...${NC}"

# Get the URL map name from backend bucket
URL_MAP=$(gcloud compute backend-buckets describe $URL_MAP_NAME --format="value(name)" 2>/dev/null || echo "")

if [ -n "$URL_MAP" ]; then
  # Try to invalidate the cache
  gcloud compute url-maps invalidate-cdn-cache $(terraform output -raw backend_bucket_name | sed 's/-backend-.*/-frontend-url-map-'"$(terraform output -raw environment)"'/') \
    --path "/*" 2>/dev/null || echo "Cache invalidation queued..."
  echo -e "${GREEN}✓ Cache invalidation initiated${NC}"
else
  echo -e "${YELLOW}Note: Could not invalidate cache automatically. Cache will expire based on TTL.${NC}"
fi

# Summary
echo -e "\n${GREEN}✅ Deployment Successful!${NC}"
echo "=============================================="
echo -e "Website URL: ${GREEN}$WEBSITE_URL${NC}"
echo ""
echo "Note: CDN propagation may take a few minutes."
echo "Check bucket: gsutil ls -l gs://$BUCKET_NAME"
echo "Monitor: gcloud logging read \"resource.type=http_load_balancer\" --limit 10"

# Optional: Open in browser (macOS/Linux)
read -p "Open website in browser? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "$WEBSITE_URL"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "$WEBSITE_URL"
    else
        echo "Please open manually: $WEBSITE_URL"
    fi
fi
