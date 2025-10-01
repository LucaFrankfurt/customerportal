# 🔐 API Authentication & Testing Guide

## Quick Start - Get Access Tokens

### Method 1: Using the Helper Script (Recommended)
```bash
./get-token.sh
```

### Method 2: Manual cURL Commands

#### Test Accounts
All test accounts use password: `password123`

- **Employee**: `employee@assetcapital.com` (Alex Thompson)
- **Customer**: `customer@assetcapital.com` (Sarah Johnson)  
- **Admin**: `admin@assetcapital.com` (John Smith)

#### Get Employee Token
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"employee@assetcapital.com","password":"password123"}'
```

#### Get Customer Token
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@assetcapital.com","password":"password123"}'
```

## 🧪 API Testing Examples

### Employee APIs (requires employee/admin token)

```bash
# Set your employee token
EMPLOYEE_TOKEN="your_employee_token_here"

# Get client statistics
curl -H "Authorization: Bearer $EMPLOYEE_TOKEN" \
  http://localhost:3001/api/clients/stats

# List all clients
curl -H "Authorization: Bearer $EMPLOYEE_TOKEN" \
  http://localhost:3001/api/clients

# Search clients
curl -H "Authorization: Bearer $EMPLOYEE_TOKEN" \
  "http://localhost:3001/api/clients?search=pension&status=Active"

# Get specific client
curl -H "Authorization: Bearer $EMPLOYEE_TOKEN" \
  http://localhost:3001/api/clients/1

# Update client
curl -X PUT -H "Authorization: Bearer $EMPLOYEE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Client Name","status":"Active"}' \
  http://localhost:3001/api/clients/1
```

### Customer APIs (requires customer token)

```bash
# Set your customer token  
CUSTOMER_TOKEN="your_customer_token_here"

# Get portfolio summary
curl -H "Authorization: Bearer $CUSTOMER_TOKEN" \
  http://localhost:3001/api/portfolio/summary

# Get holdings
curl -H "Authorization: Bearer $CUSTOMER_TOKEN" \
  http://localhost:3001/api/portfolio/holdings

# Get transactions
curl -H "Authorization: Bearer $CUSTOMER_TOKEN" \
  http://localhost:3001/api/portfolio/transactions

# Get performance data
curl -H "Authorization: Bearer $CUSTOMER_TOKEN" \
  "http://localhost:3001/api/portfolio/performance?period=1Y"
```

### User Profile APIs (any authenticated user)

```bash
# Set your token (employee, customer, or admin)
TOKEN="your_token_here"

# Get profile
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/users/profile

# Update profile
curl -X PUT -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Updated","lastName":"Name"}' \
  http://localhost:3001/api/users/profile

# Get notifications
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/users/notifications
```

### Conversation APIs

```bash
# Get all conversations
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/conversations

# Start conversation with client (employee only)
curl -X POST -H "Authorization: Bearer $EMPLOYEE_TOKEN" \
  http://localhost:3001/api/conversations/client/1

# Get conversation details
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/conversations/1

# Get messages
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/conversations/1/messages

# Send message
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello, this is a test message"}' \
  http://localhost:3001/api/conversations/1/messages
```

## 🏗️ Current Sample Data

### Users
- **Alex Thompson** (employee@assetcapital.com) - Employee
- **Sarah Johnson** (customer@assetcapital.com) - Customer  
- **John Smith** (admin@assetcapital.com) - Admin

### Clients (visible to employees)
- Meridian Pension Fund ($450M AUM)
- Global University Endowment ($280M AUM)
- Sterling Insurance Corp ($320M AUM)
- Pacific Health System ($190M AUM)

### Portfolio (for Sarah Johnson)
- Total Value: $2.8M
- YTD Performance: +12.4%
- Holdings: Sample stocks with allocations

## 🔧 Token Management

### Token Structure
JWT tokens contain:
```json
{
  "userId": 1,
  "email": "user@example.com", 
  "role": "employee|customer|admin",
  "iat": 1759143282,
  "exp": 1759229682
}
```

### Token Expiration
- Tokens expire after 24 hours
- Generate new tokens by logging in again
- Check token expiry with: `jwt.io`

### Using Tokens in Frontend
```javascript
// Store token
localStorage.setItem('authToken', token);

// Use in API calls
const response = await fetch('/api/clients', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'Content-Type': 'application/json'
  }
});
```

## 🚀 Testing Workflow

1. **Get Token**: Use `./get-token.sh` or manual cURL
2. **Set Environment**: `export TOKEN="your_token_here"`
3. **Test APIs**: Use the curl examples above
4. **Check Database**: Use Adminer at http://localhost:8080
5. **View Logs**: `npm run db:docker:logs` for database logs

## 🛠️ Troubleshooting

### "Invalid credentials"
- Check password is exactly: `password123`
- Ensure users exist: Check Adminer or run user queries

### "Unauthorized" 
- Token expired (24h limit)
- Wrong token for endpoint role requirements
- Token format: must be `Bearer your_token_here`

### "Database connection failed"
- Ensure PostgreSQL is running: `docker-compose ps`
- Restart if needed: `npm run db:docker:start`

The APIs are now fully functional and ready for frontend integration! 🎉