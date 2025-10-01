# 🐳 PostgreSQL with Docker Setup

This guide will help you set up PostgreSQL using Docker for the Customer Portal backend.

## Prerequisites

- Docker Desktop installed and running
- Node.js 18+ installed

## Quick Start

### 1. Start PostgreSQL with Docker

```bash
# From the project root directory
npm run db:docker:setup
```

This will:
- Start PostgreSQL container on port 5432
- Create the `customer_portal` database
- Apply the database schema
- Insert sample data
- Start Adminer (web-based DB admin) on port 8080

### 2. Verify Setup

```bash
# Check if containers are running
docker-compose ps

# View PostgreSQL logs
npm run db:docker:logs

# Open database admin interface
npm run db:admin
```

### 3. Start Backend Server

```bash
npm run dev:backend
```

## Database Management Commands

```bash
# Start database only
npm run db:docker:start

# Stop database
npm run db:docker:stop

# Reset database (delete all data and recreate)
npm run db:docker:reset

# View database logs
npm run db:docker:logs

# Open Adminer web interface
npm run db:admin
```

## Adminer Database Admin

Access the web-based database admin at: http://localhost:8080

**Login Details:**
- System: PostgreSQL
- Server: postgres
- Username: postgres
- Password: postgres
- Database: customer_portal

## Connection Details

Your backend is configured to connect to:
- Host: localhost
- Port: 5432
- Database: customer_portal
- Username: postgres
- Password: postgres

## Troubleshooting

### Docker not running
```bash
# Check if Docker is running
docker info

# If not, start Docker Desktop application
```

### Port 5432 already in use
```bash
# Stop any existing PostgreSQL service
brew services stop postgresql

# Or change the port in docker-compose.yml
```

### Reset everything
```bash
# Stop and remove all containers and volumes
docker-compose down -v
docker system prune -f

# Start fresh
npm run db:docker:setup
```

## Development Workflow

1. **Start database**: `npm run db:docker:start`
2. **Start backend**: `npm run dev:backend`
3. **Start frontend**: `npm run dev:frontend`
4. **View database**: `npm run db:admin`

The database will persist data between container restarts unless you use the reset command.

## Sample Data

The setup includes sample data for testing:
- 4 sample clients (Meridian Pension Fund, Global University Endowment, etc.)
- 1 sample customer user with portfolio data
- Holdings data (VOO, MSFT, AAPL)
- Recent transactions
- Sample notifications

## Files Created

- `docker-compose.yml` - Docker services configuration
- `backend/.env` - Updated with Docker database connection
- `backend/database/docker-setup.sh` - Docker setup script
- Database schema automatically applied on first run