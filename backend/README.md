# Customer Portal Backend API

Node.js REST API backend for the customer asset management portal with JWT authentication, PostgreSQL database, and comprehensive endpoint coverage.

> 💡 **Looking for a quick demo backend?** This repo now includes a lightweight mock server (`src/demoMockServer.ts`) that returns in-memory data and is purpose-built for frontend demonstrations. No database required.

## ⚡ Quick Start (Demo Mock Backend)

Run the mock backend to power the React frontend locally:

```bash
npm install
npm run dev:demo
```

The server starts on `http://localhost:3001` and exposes the same routes the frontend expects.

### Demo accounts

| Email                   | Password     | Role      |
| ----------------------- | ------------ | --------- |
| `customer@example.com`  | `password123`| customer  |
| `employee@example.com`  | `password123`| employee  |

### Primary mock endpoints

| Method | Endpoint                                   | Description                          |
| ------ | ------------------------------------------ | ------------------------------------ |
| POST   | `/api/auth/login`                          | Returns JWT and user profile         |
| POST   | `/api/auth/register`                       | Creates an in-memory demo account    |
| POST   | `/api/auth/logout`                         | Returns a simple success response    |
| GET    | `/api/portfolio`                           | Portfolio summary metrics            |
| GET    | `/api/portfolio/holdings`                  | Detailed holdings list               |
| GET    | `/api/portfolio/transactions?limit=20`     | Transaction history with pagination  |
| GET    | `/api/portfolio/performance`               | 12-month performance series          |
| GET    | `/api/users/profile` / `PUT /api/users/profile` | Read/update profile data           |
| GET    | `/api/users/notifications`                 | Notification feed (supports `unread=true`) |
| POST   | `/api/meetings/request`                    | Submit a meeting request             |
| GET    | `/api/meetings`                            | List meeting requests (filterable)   |
| GET    | `/api/conversations`                       | Conversation summaries               |
| GET    | `/api/conversations/:id` / POST `.../messages` | Conversation details + send message |
| GET    | `/api/dashboard/metrics`                   | High-level dashboard stats           |
| GET    | `/api/market/data`                         | Market highlights & indices          |

All responses follow the `{ success: boolean, data: { ... } }` convention used in the frontend.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Database**: PostgreSQL with connection pooling
- **Security**: Helmet, CORS, rate limiting, input validation
- **Logging**: Structured logging with Winston
- **TypeScript**: Full type safety and modern ES features
- **API Documentation**: RESTful endpoints for all frontend features

## 🏗️ Project Structure

```
src/
├── config/
│   └── database.ts          # PostgreSQL configuration
├── controllers/             # Request handlers
├── middleware/
│   ├── auth.ts             # JWT authentication
│   ├── errorHandler.ts     # Global error handling
│   └── notFoundHandler.ts  # 404 handler
├── models/                 # Database models
├── routes/
│   ├── auth.ts            # Authentication endpoints
│   ├── clients.ts         # Client management
│   ├── conversations.ts   # Chat conversations
│   ├── portfolio.ts       # Portfolio data
│   └── users.ts           # User profile management
├── services/              # Business logic
├── utils/
│   └── logger.ts          # Winston logger setup
└── index.ts              # Application entry point
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL >= 12
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database setup:**
   ```bash
   # Create PostgreSQL database
   createdb customer_portal
   
   # Run migrations (TODO: Add migration system)
   # npm run migrate
   ```

4. **Development:**
   ```bash
   npm run dev
   ```

5. **Production:**
   ```bash
   npm run build
   npm start
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Client Management (Employee only)
- `GET /api/clients` - List all clients
- `PUT /api/clients/:id` - Update client information

### Conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id` - Get conversation details

### Portfolio
- `GET /api/portfolio` - Get user's portfolio data

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔐 Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Clients Table
```sql
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  aum DECIMAL(15,2),
  status VARCHAR(50),
  priority VARCHAR(20),
  last_contact TIMESTAMP,
  assigned_advisor_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 3001 |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | customer_portal |
| `DB_USER` | Database user | - |
| `DB_PASSWORD` | Database password | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | JWT expiration | 24h |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## 🧪 Testing

```bash
npm test
```

## 🚀 Deployment

The API is designed to be deployed on platforms like:
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk
- Docker containers

## 📝 License

MIT License - see LICENSE file for details.