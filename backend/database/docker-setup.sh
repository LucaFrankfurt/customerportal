#!/bin/bash

# Docker PostgreSQL Setup Script for Customer Portal
set -e

echo "🐳 Setting up PostgreSQL with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running"
    echo "Please start Docker Desktop and try again"
    exit 1
fi

echo "✅ Docker is running"

# Navigate to project root (where docker-compose.yml is)
cd "$(dirname "$0")/../.."

# Start PostgreSQL container
echo "🚀 Starting PostgreSQL container..."
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker-compose exec postgres pg_isready -U postgres -d customer_portal > /dev/null 2>&1; do
    sleep 2
    echo "   Still waiting..."
done

echo "✅ PostgreSQL is ready!"

# Check if schema was automatically applied
TABLES_COUNT=$(docker-compose exec -T postgres psql -U postgres -d customer_portal -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'" | xargs)

if [ "$TABLES_COUNT" -gt 0 ]; then
    echo "✅ Database schema already applied ($TABLES_COUNT tables found)"
    
    # Show statistics
    CLIENTS_COUNT=$(docker-compose exec -T postgres psql -U postgres -d customer_portal -t -c "SELECT COUNT(*) FROM clients" 2>/dev/null | xargs || echo "0")
    USERS_COUNT=$(docker-compose exec -T postgres psql -U postgres -d customer_portal -t -c "SELECT COUNT(*) FROM users" 2>/dev/null | xargs || echo "0")
    
    echo "📊 Database Statistics:"
    echo "   - Users: $USERS_COUNT"
    echo "   - Clients: $CLIENTS_COUNT"
else
    echo "📋 Applying database schema..."
    docker-compose exec -T postgres psql -U postgres -d customer_portal < backend/database/schema.sql
    echo "✅ Schema applied successfully"
fi

echo ""
echo "🎉 Docker PostgreSQL setup complete!"
echo ""
echo "📝 Services running:"
echo "   - PostgreSQL: localhost:5432"
echo "   - Adminer (DB Admin): http://localhost:8080"
echo ""
echo "🔧 Adminer Login Details:"
echo "   System: PostgreSQL"
echo "   Server: postgres"
echo "   Username: postgres"
echo "   Password: postgres"
echo "   Database: customer_portal"
echo ""
echo "⚡ Quick commands:"
echo "   Start containers: docker-compose up -d"
echo "   Stop containers: docker-compose down"
echo "   View logs: docker-compose logs postgres"
echo "   Reset database: docker-compose down -v && docker-compose up -d"