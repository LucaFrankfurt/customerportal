# Customer Portal Demo Backend

This backend is a lightweight Express + TypeScript server that returns in-memory mock data so the React customer portal can run without database setup or additional services.

## ⚡ Quick Start

```bash
cd backend
npm install
npm run dev:demo
```

The server listens on `http://localhost:3001` and matches the endpoints the frontend consumes.

## 👤 Demo Accounts

| Email                  | Password     | Role      |
| ---------------------- | ------------ | --------- |
| `customer@example.com` | `password123`| customer  |
| `employee@example.com` | `password123`| employee  |

## 🔌 Available Endpoints

All responses follow the shape `{ success: boolean, data: { ... } }` and succeed immediately with mock data.

| Method | Endpoint                                   | Description                          |
| ------ | ------------------------------------------ | ------------------------------------ |
| POST   | `/api/auth/login`                          | Authenticate user and issue JWT      |
| POST   | `/api/auth/register`                       | Create an in-memory demo account     |
| POST   | `/api/auth/logout`                         | Returns a success acknowledgement    |
| GET    | `/api/portfolio`                           | Portfolio summary metrics            |
| GET    | `/api/portfolio/holdings`                  | Detailed holdings list               |
| GET    | `/api/portfolio/transactions?limit=20`     | Transaction history with pagination  |
| GET    | `/api/portfolio/performance`               | 12-month performance series          |
| GET    | `/api/users/profile`                       | Logged-in user profile               |
| PUT    | `/api/users/profile`                       | Update user profile fields           |
| GET    | `/api/users/notifications`                 | Notification feed (`unread=true`)    |
| POST   | `/api/meetings/request`                    | Submit meeting request               |
| GET    | `/api/meetings`                            | List meeting requests                |
| GET    | `/api/meetings/:id`                        | Retrieve a meeting request           |
| PUT    | `/api/meetings/:id`                        | Update meeting status/notes          |
| GET    | `/api/conversations`                       | Conversation summaries               |
| GET    | `/api/conversations/:id`                   | Conversation details                 |
| POST   | `/api/conversations/:id/messages`          | Append message to conversation       |
| GET    | `/api/dashboard/metrics`                   | Dashboard statistics                 |
| GET    | `/api/market/data`                         | Market highlights and indices        |

## 📁 Project Structure

```
backend/
├── package.json
├── tsconfig.json
└── src/
    └── demoMockServer.ts
```

`demoMockServer.ts` contains all route handlers and mock datasets.

## 🧰 Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev:demo`   | Start the mock server with ts-node   |
| `npm run build`      | Compile TypeScript to `dist/`        |
| `npm run start:demo` | Run the compiled server from `dist/` |

## ✅ Notes

- Restarting the server resets all in-memory data (meeting requests, conversations, etc.).
- The code intentionally avoids external data sources for a frictionless demo experience.
- Legacy database-related code has been removed; rely on this mock server for frontend showcases.