# Customer Portal 4 – Demo Application

Full-stack asset management portal featuring a React/TypeScript frontend and Express/TypeScript mock backend.

## 🎨 Frontend Features

- Landing page with hero & features
- Customer dashboard (portfolio, analytics, planning, documents)
- Employee dashboard (client management)
- Dark/light theme toggle
- Responsive design
- Mock data integration

See `frontend/README.md` for detailed screen and component documentation.

## 🚀 Features

### Option 1: Docker Compose (Recommended)

```bash
# Build and start both services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

### Option 2: Local Development

**Backend:**
```bash
cd backend
npm install
npm run dev:demo
# Runs on http://localhost:3001
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## � Repository Structure

```
Customer Portal 4/
├── backend/               # Express + TypeScript mock API
│   ├── src/
│   │   └── demoMockServer.ts
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── frontend/              # React + Vite + Tailwind + shadcn/ui
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── lib/
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── docker-compose.yml
└── .dockerignore
```

## 🐳 Docker Commands

```bash
# Start services
docker-compose up

# Build and start (fresh build)
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

## 👤 Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| `customer@example.com` | `password123` | Customer |
| `employee@example.com` | `password123` | Employee |

## 🔌 API Endpoints

Backend mock server exposes:
- `/api/auth/*` – Authentication
- `/api/portfolio/*` – Holdings, transactions, performance
- `/api/meetings/*` – Meeting requests
- `/api/conversations/*` – Messaging
- `/api/users/*` – Profile, notifications
- `/api/dashboard/*` – Metrics
- `/api/market/*` – Market data

See `backend/README.md` for complete endpoint documentation.

### Core Dashboard
- **Portfolio Overview** - Real-time portfolio valuation, asset allocation, and performance summary
- **Holdings Management** - Detailed view of all investments with performance tracking
- **Transaction History** - Complete transaction log with filtering and search capabilities

### Advanced Analytics
- **📈 Performance Analytics** - Interactive charts showing portfolio performance vs benchmarks
- **📊 Risk Metrics** - Comprehensive risk analysis including VaR, Sharpe ratio, and volatility
- **🎯 Attribution Analysis** - Performance attribution by sector, asset class, and individual holdings
- **📉 Benchmark Comparison** - Side-by-side performance comparison with market indices

### Investment Management
- **💡 Investment Proposals** - Review and approve investment recommendations from advisors
- **📋 Rebalancing Workflows** - Approve portfolio rebalancing with impact visualization
- **🎯 Goal Tracking** - Monitor progress toward investment objectives

### Market Intelligence
- **📰 Market Insights** - Curated market news and economic updates
- **📚 Research Reports** - Access to analyst research and investment commentary
- **📊 Market Indicators** - Real-time market data and trending securities
- **🔖 Content Bookmarking** - Save and organize important articles and reports

### Document Management
- **📋 Document Center** - Centralized access to statements, reports, and tax documents
- **🔍 Advanced Search** - Find documents by type, date, or content
- **📥 Secure Downloads** - Encrypted document delivery with audit trails
- **📂 Smart Organization** - Automatic categorization and tagging

### Tax Management
- **🧾 Tax Center** - Comprehensive tax reporting and planning tools
- **📊 Tax-Loss Harvesting** - Automated tax optimization opportunities
- **📋 Tax Documents** - Centralized access to tax forms and statements
- **📈 Tax Projections** - Forward-looking tax impact analysis

### Goals & Financial Planning
- **🎯 Goal Tracking** - Monitor progress toward financial objectives
- **📊 Retirement Planning** - Comprehensive retirement income projections
- **🏆 Financial Milestones** - Track key financial achievements
- **🧮 Planning Tools** - Interactive calculators and planning resources

### Reports & Analytics
- **📊 Custom Reports** - Generate tailored portfolio reports
- **📅 Scheduled Reports** - Automated report delivery
- **📋 Report Templates** - Pre-built report formats
- **📈 Compliance Reporting** - Regulatory and fiduciary reports

### Risk Management
- **🛡️ Risk Metrics Dashboard** - Comprehensive risk monitoring
- **📉 Stress Testing** - Scenario analysis and portfolio stress tests
- **⚠️ Risk Alerts** - Real-time risk monitoring and alerts
- **📊 Risk Allocation** - Portfolio risk exposure analysis

### Research & Analysis
- **🔬 Research Hub** - Access to analyst reports and market research
- **🏢 Company Profiles** - Detailed company analysis and financials
- **📰 Market Research** - Economic outlook and thematic research
- **📚 Bookmarked Content** - Saved research and reports

### Communication & Notifications
- **🔔 Smart Notifications** - Real-time alerts for account activities and market events
- **💬 Secure Messaging** - Direct communication with advisors and support team
- **📅 Meeting Scheduling** - Book appointments and consultations
- **⚙️ Preference Management** - Customize notification settings and communication preferences

### Security & Settings
- **🔐 Multi-Factor Authentication** - Enhanced security with JWT tokens
- **👤 Profile Management** - Update personal information and investment preferences
- **🛡️ Privacy Controls** - Granular privacy and communication settings
- **📱 Device Management** - Monitor and manage authorized devices

## 🛠 Technology Stack

### Frontend
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible components
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express** - Web application framework
- **TypeScript** - Type-safe server development
- **JWT** - Secure authentication
- **bcrypt** - Password hashing
- **In-Memory Mock Data** - No database required

### Deployment
- **Docker & Docker Compose** - Containerization
- **Multi-stage builds** - Optimized images
- **Nginx** - Frontend static file serving

## 📝 Development Notes

- Backend resets in-memory data on restart
- No database required (mock-only)
- Frontend API calls point to `http://localhost:3001` by default
- Modify `frontend/src/lib/api.ts` to change backend URL

## 🔧 Environment Configuration

Backend `.env` (optional for demo):
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=demo-secret-key
```

Frontend environment variables handled via Vite config if needed.

## 📄 License

MIT – Demo/showcase purposes.

## 🤝 Contributing

This is a demonstration project. For production use:
1. Replace mock backend with real database & authentication
2. Add comprehensive error handling
3. Implement proper state management (React Query/Zustand)
4. Add unit & integration tests
5. Configure production environment variables
6. Set up CI/CD pipeline

---

For detailed documentation, see the README files in `backend/` and `frontend/` directories.