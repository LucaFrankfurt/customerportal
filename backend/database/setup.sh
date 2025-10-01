#!/bin/bash

# Database Setup Script for Customer Portal
# This script creates the database and runs the schema

set -e

# Database configuration (can be overridden by environment variables)
DB_NAME=${DB_NAME:-"customer_portal"}
DB_USER=${DB_USER:-"postgres"}
DB_HOST=${DB_HOST:-"localhost"}
DB_PORT=${DB_PORT:-"5432"}

echo "🔧 Setting up Customer Portal Database..."

# Check if PostgreSQL is running
if ! pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running or not accessible"
    echo "Please ensure PostgreSQL is running on $DB_HOST:$DB_PORT"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if it doesn't exist
echo "🗄️  Creating database '$DB_NAME' if it doesn't exist..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "CREATE DATABASE $DB_NAME"

echo "✅ Database '$DB_NAME' is ready"

# Run schema setup
echo "📋 Running database schema setup..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$(dirname "$0")/schema.sql"

echo "✅ Database schema applied successfully"

# Check if sample data was inserted
CLIENTS_COUNT=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM clients" | xargs)
USERS_COUNT=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM users" | xargs)

echo "📊 Database Statistics:"
echo "   - Users: $USERS_COUNT"
echo "   - Clients: $CLIENTS_COUNT"

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Update your .env file with the database connection string"
echo "   2. Start the backend server: npm run dev"
echo "   3. Test the API endpoints"
echo ""
echo "🔗 Database Connection String:"
echo "   postgresql://$DB_USER@$DB_HOST:$DB_PORT/$DB_NAME"