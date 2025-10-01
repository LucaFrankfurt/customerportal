# 📮 Postman Collection Setup Guide

## 📥 Import Instructions

### Method 1: Import Files
1. Open Postman
2. Click **Import** button
3. Drag and drop these files:
   - `Customer_Portal_API.postman_collection.json`
   - `Customer_Portal_Local.postman_environment.json`
4. Select the **Customer Portal - Local Development** environment

### Method 2: Import from URL (if hosted)
```
Collection URL: [Your hosted collection URL]
Environment URL: [Your hosted environment URL]
```

## 🚀 Quick Start Workflow

### Step 1: Authentication
1. **Select Environment**: Choose "Customer Portal - Local Development"
2. **Login as Employee**:
   - Go to `🔐 Authentication > Login - Employee`
   - Click **Send**
   - Token is automatically saved to `{{employeeToken}}`
3. **Login as Customer**:
   - Go to `🔐 Authentication > Login - Customer` 
   - Click **Send**
   - Token is automatically saved to `{{customerToken}}`

### Step 2: Test Employee APIs
```
👥 Client Management (Employee Only)
├── Get All Clients (paginated list)
├── Search Clients (with filters)
├── Get Client Statistics (dashboard metrics)
├── Get Client by ID (specific client)
├── Create New Client (POST request)
└── Update Client (PUT request)
```

### Step 3: Test Customer APIs
```
📊 Portfolio Management (Customer)
├── Get Portfolio Summary (overview stats)
├── Get Portfolio Holdings (current positions)
├── Get Transaction History (buy/sell history)
└── Get Performance History (charts data)
```

### Step 4: Test Universal APIs
```
👤 User Profile Management
├── Get User Profile (role-specific data)
├── Update User Profile (PUT request)
├── Get User Notifications (alerts/messages)
└── Mark Notification as Read (PUT request)

💬 Conversations & Messaging
├── Get All Conversations (chat list)
├── Start Conversation with Client (employee only)
├── Get Conversation Details (participants)
├── Get Conversation Messages (chat history)
├── Send Message (POST new message)
└── Mark Messages as Read (PUT request)
```

## 🔧 Collection Features

### Automatic Token Management
- **Auto-Save Tokens**: Login requests automatically save JWT tokens
- **Auto-Apply Auth**: Requests use appropriate tokens based on folder
- **Token Variables**: `{{employeeToken}}`, `{{customerToken}}`, `{{adminToken}}`

### Smart Request Organization
- **Role-Based Folders**: Organized by user permission level
- **Descriptive Names**: Clear endpoint purposes
- **Sample Data**: Pre-filled request bodies with realistic data

### Built-in Testing
- **Response Validation**: Automatic checks for success status
- **Token Extraction**: Auto-saves tokens from login responses
- **Error Logging**: Console logs for debugging

### Environment Variables
```javascript
{{baseUrl}}         // http://localhost:3001/api
{{authToken}}       // Current active token
{{employeeToken}}   // Employee JWT token
{{customerToken}}   // Customer JWT token
{{adminToken}}      // Admin JWT token
{{employeeEmail}}   // employee@assetcapital.com
{{customerEmail}}   // customer@assetcapital.com
{{testPassword}}    // password123
```

## 📋 Test Accounts

| Role | Email | Password | Access |
|------|-------|----------|---------|
| **Employee** | employee@assetcapital.com | password123 | Client management, conversations |
| **Customer** | customer@assetcapital.com | password123 | Portfolio, profile, conversations |
| **Admin** | admin@assetcapital.com | password123 | All endpoints |

## 🧪 Testing Scenarios

### Scenario 1: Employee Dashboard
1. Login as Employee
2. Get Client Statistics → Dashboard overview
3. Get All Clients → Client list
4. Search Clients → Filter by status/priority
5. Update Client → Edit client info

### Scenario 2: Customer Dashboard  
1. Login as Customer
2. Get Portfolio Summary → Portfolio stats
3. Get Portfolio Holdings → Current positions
4. Get Transaction History → Recent activity
5. Update Profile → Change preferences

### Scenario 3: Communication Flow
1. Employee: Start Conversation with Client
2. Employee: Send Message
3. Customer: Get Conversations 
4. Customer: Get Messages
5. Customer: Send Reply
6. Both: Mark Messages as Read

### Scenario 4: Profile Management
1. Get User Profile → View current data
2. Update Profile → Change info
3. Get Notifications → Check alerts
4. Mark Notification as Read → Clear alerts

## 🎯 API Endpoint Summary

### Authentication (`/auth`)
- `POST /auth/login` - User login with email/password
- `POST /auth/logout` - User logout

### Client Management (`/clients`) - Employee/Admin Only
- `GET /clients` - List clients (paginated, searchable)
- `GET /clients/stats` - Dashboard statistics  
- `GET /clients/:id` - Get specific client
- `POST /clients` - Create new client
- `PUT /clients/:id` - Update client

### Portfolio Management (`/portfolio`) - Customer Only
- `GET /portfolio/summary` - Portfolio overview
- `GET /portfolio/holdings` - Current positions
- `GET /portfolio/transactions` - Transaction history
- `GET /portfolio/performance` - Historical data

### User Management (`/users`) - All Authenticated
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `GET /users/notifications` - Get notifications
- `PUT /users/notifications/:id/read` - Mark read

### Conversations (`/conversations`) - All Authenticated
- `GET /conversations` - List conversations
- `POST /conversations/client/:id` - Start conversation (employee)
- `GET /conversations/:id` - Get conversation details
- `GET /conversations/:id/messages` - Get messages
- `POST /conversations/:id/messages` - Send message
- `PUT /conversations/:id/messages/read` - Mark messages read

### Health Check (`/health`) - Public
- `GET /health` - Server health status

## 🛠️ Troubleshooting

### Token Issues
- **401 Unauthorized**: Token expired or invalid → Re-login
- **403 Forbidden**: Wrong role for endpoint → Use correct user type
- **Missing Authorization**: Check token variable is set

### Connection Issues  
- **Connection Refused**: Backend not running → `npm run dev:backend`
- **404 Not Found**: Wrong endpoint URL → Check baseUrl variable
- **Database Errors**: PostgreSQL not running → `npm run db:docker:start`

### Request Issues
- **400 Bad Request**: Invalid request body → Check JSON format
- **422 Validation Error**: Missing required fields → Add required data
- **500 Server Error**: Backend issue → Check server logs

## 🔄 Environment Switching

For different environments, update the `baseUrl` variable:

- **Local**: `http://localhost:3001/api`
- **Development**: `https://dev-api.customerportal.com/api`
- **Production**: `https://api.customerportal.com/api`

## 📊 Response Format

All API responses follow this structure:
```json
{
  "success": true|false,
  "data": {
    // Response data
  },
  "error": {
    "message": "Error description",
    "stack": "Error stack trace (development only)"
  }
}
```

The Postman collection is now ready for comprehensive API testing! 🚀