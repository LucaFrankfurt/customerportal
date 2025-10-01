#!/bin/bash

# Get Access Token Script for Customer Portal API
# This script helps you authenticate and get JWT tokens for testing

API_BASE_URL="http://localhost:3001/api"

echo "🔐 Customer Portal - Get Access Token"
echo "===================================="
echo ""

echo "Available test accounts:"
echo "1. Employee: employee@assetcapital.com"
echo "2. Customer: customer@assetcapital.com" 
echo "3. Admin: admin@assetcapital.com"
echo ""
echo "Password for all accounts: password123"
echo ""

# Function to get token
get_token() {
    local email=$1
    local password=$2
    local role_name=$3
    
    echo "🔄 Logging in as $role_name ($email)..."
    
    response=$(curl -s -X POST "$API_BASE_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$email\",\"password\":\"$password\"}")
    
    # Check if login was successful
    if echo "$response" | grep -q '"success":true'; then
        token=$(echo "$response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
        echo "✅ Login successful!"
        echo ""
        echo "🎫 Your JWT Token:"
        echo "$token"
        echo ""
        echo "📋 Copy this for API testing:"
        echo "Authorization: Bearer $token"
        echo ""
        echo "🧪 Test API call example:"
        echo "curl -H \"Authorization: Bearer $token\" $API_BASE_URL/users/profile"
        echo ""
        
        # Save token to file for easy access
        echo "$token" > ".${role_name}_token.txt"
        echo "💾 Token saved to .${role_name}_token.txt"
        
    else
        echo "❌ Login failed!"
        echo "Response: $response"
    fi
}

# Main menu
echo "Select an account to get token for:"
echo "1) Employee (Alex Thompson)"
echo "2) Customer (Sarah Johnson)"
echo "3) Admin (John Smith)"
echo "4) Custom login"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        get_token "employee@assetcapital.com" "password123" "employee"
        ;;
    2)
        get_token "customer@assetcapital.com" "password123" "customer"
        ;;
    3)
        get_token "admin@assetcapital.com" "password123" "admin"
        ;;
    4)
        read -p "Enter email: " email
        read -s -p "Enter password: " password
        echo ""
        get_token "$email" "$password" "custom"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🚀 You can now test the protected API endpoints!"
echo ""
echo "📖 API Documentation:"
echo "  Employee APIs: /api/clients, /api/clients/stats"
echo "  Customer APIs: /api/portfolio/summary, /api/portfolio/holdings"
echo "  User APIs: /api/users/profile, /api/users/notifications"
echo "  Chat APIs: /api/conversations"