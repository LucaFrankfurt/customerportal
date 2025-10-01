# Customer Portal API - Postman Collection Guide

## 🚀 Quick Start

### 1. Import Collections
1. **Main Collection:** Import `Customer_Portal_Mock_API.postman_collection.json`
2. **Environment:** Import `Customer_Portal_Local.postman_environment.json`
3. **Legacy Collection:** `Customer_Portal_API.postman_collection.json` (updated for mock backend)

### 2. Start Mock Backend
```bash
cd backend
npx ts-node src/completeMockServer.ts
```
Server will start on `http://localhost:3001`

### 3. Select Environment
In Postman, select **"Customer Portal - Mock Backend (No Database)"** environment

## 🔐 Authentication

### Login Credentials
- **Email:** `customer@example.com`
- **Password:** `password123`
- **User:** Sarah Johnson (Customer)

### How to Authenticate
1. Run **"Login - Customer"** request from Authentication folder
2. Token will be automatically saved to `{{authToken}}` variable
3. All subsequent requests will use this token automatically

## 📊 Available Endpoints

### Health Check
- **GET** `/health` - Check server status

### Authentication  
- **POST** `/api/auth/login` - User login

### Portfolio Management
- **GET** `/api/portfolio/summary` - Portfolio overview ($2.8M portfolio)
- **GET** `/api/portfolio/holdings` - Current holdings (VOO, MSFT, AAPL)
- **GET** `/api/portfolio/transactions` - Transaction history
- **GET** `/api/portfolio/transactions?limit=10&offset=0` - Paginated transactions

### User Management
- **GET** `/api/users/profile` - User profile
- **PUT** `/api/users/profile` - Update profile
- **GET** `/api/users/notifications` - All notifications  
- **GET** `/api/users/notifications?unread=true` - Unread only

### Dashboard & Analytics
- **GET** `/api/dashboard/metrics` - Dashboard metrics
- **GET** `/api/market/data` - Market data & indices

## 📈 Sample Data Overview

### Portfolio Summary
```json
{
  "totalValue": "$2,847,320",
  "ytdPerformance": "+12.4%", 
  "monthlyReturn": "+2.1%",
  "riskScore": "7.2/10",
  "dayChange": "+$87,450 (3.17%)"
}
```

### Holdings Sample
- **VOO** - Vanguard S&P 500 ETF (850 shares, $358,147.50)
- **MSFT** - Microsoft Corporation (400 shares, $169,156.00)
- **AAPL** - Apple Inc (300 shares, $56,838.00)

### Recent Transactions
- **Buy** VOO 150 shares @ $421.35 (Sep 28, 2025)
- **Dividend** MSFT $544.00 (Sep 25, 2025)
- **Sell** TSLA 50 shares @ $251.05 (Sep 23, 2025)

## 🧪 Testing Features

### Automatic Token Management
- Login requests automatically save JWT tokens
- Tokens are automatically used in authenticated requests
- No manual token copying required

### Global Tests
All requests include automatic tests for:
- Response time (< 2000ms)
- Content-Type validation (JSON)
- Status code verification

### Error Testing
- Test invalid endpoints (404 responses)
- Test unauthorized requests (401 responses)
- Test malformed requests (400 responses)

## 📝 Request Examples

### 1. Login and Get Portfolio
```bash
# 1. Login (saves token automatically)
POST /api/auth/login
{
  "email": "customer@example.com",
  "password": "password123"
}

# 2. Get portfolio (uses saved token)
GET /api/portfolio/summary
Authorization: Bearer {{authToken}}
```

### 2. Update Profile
```bash
PUT /api/users/profile
{
  "phone": "+1-555-9999",
  "address": "456 Updated St, New York, NY 10001"
}
```

### 3. Get Paginated Transactions
```bash
GET /api/portfolio/transactions?limit=5&offset=0
```

## 🔧 Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `baseUrl` | `http://localhost:3001/api` | API base URL |
| `healthUrl` | `http://localhost:3001/health` | Health check URL |
| `authToken` | (auto-populated) | JWT authentication token |
| `customerEmail` | `customer@example.com` | Demo user email |
| `customerPassword` | `password123` | Demo user password |

## 🚨 Troubleshooting

### Server Not Running
```bash
# Check if server is running
curl http://localhost:3001/health

# Start server if needed
cd backend
npx ts-node src/completeMockServer.ts
```

### Authentication Issues
- Ensure you run the login request first
- Check that `{{authToken}}` variable is populated
- Verify you're using the correct environment

### Request Failures
- Check server logs for detailed error messages
- Verify request format matches API expectations
- Ensure all required headers are included

## 📋 Collection Structure

```
📁 Customer Portal API - Mock Backend
├── 🏥 Health Check
│   └── Backend Health Status
├── 🔐 Authentication  
│   └── Login - Customer
├── 📊 Portfolio Management
│   ├── Get Portfolio Summary
│   ├── Get Portfolio Holdings
│   ├── Get Transaction History
│   └── Get Transaction History - With Pagination
├── 👤 User Management
│   ├── Get User Profile
│   ├── Update User Profile
│   ├── Get All Notifications
│   └── Get Unread Notifications
├── 📈 Dashboard & Analytics
│   ├── Get Dashboard Metrics
│   └── Get Market Data
└── 🧪 Testing & Examples
    ├── Test Invalid Endpoint
    └── Test Unauthorized Request
```

## 🎯 Benefits of Mock Backend

- ✅ **No Database Setup** - Runs completely in memory
- ✅ **Instant Startup** - No configuration required
- ✅ **Realistic Data** - Complete portfolio and user data
- ✅ **API Compatible** - Same interface as production backend
- ✅ **Perfect for Testing** - Consistent, predictable responses

## 📚 Additional Resources

- **README.md** - Complete application documentation
- **Frontend:** http://localhost:5173 (when running)
- **Backend Health:** http://localhost:3001/health
- **API Documentation:** Available in request descriptions

---

**Ready to test!** Import the collection, select the environment, and start making requests! 🚀