# Customer Portal - Asset Management Platform

A comprehensive customer portal for asset management firms, providing clients with secure access to their investment portfolios, performance analytics, market insights, and communication tools.

## 🎯 **Ready to Run - No Database Setup Required!**

This application features a **complete mock backend** with realistic data that runs without any database dependencies. Perfect for development, testing, and demonstration purposes.

**⚡ Quick Start:** Just run two commands and you're ready to go!
- Start backend: `npx ts-node src/completeMockServer.ts`  
- Start frontend: `npm run dev`
- Login with: `customer@example.com` / `password123`

## 🚀 Features

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
- **React 19.1.1** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite 7.1.7** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible components
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **JSON Web Tokens (JWT)** - Secure authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Mock Data Services** - Complete in-memory data simulation (no database required)

### Database
- **In-Memory Mock Data** - No external database dependencies
- **Realistic Sample Data** - Comprehensive portfolio, transaction, and user data
- **API-Compatible** - Maintains exact same interface as production backend

## � Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd customer-portal-4
```

### 2. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd ../backend
npm install
```

### 3. Start the Application

**Start Mock Backend (Terminal 1):**
```bash
cd backend
npx ts-node src/completeMockServer.ts
```
*Server will start on http://localhost:3001*

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
*Application will start on http://localhost:5173*

### 4. Access the Application

Open your browser and navigate to: **http://localhost:5173**

## 🔐 Login Credentials

### Demo User Account
- **Email:** `customer@example.com`
- **Password:** `password123`
- **Role:** Customer
- **Name:** Sarah Johnson

### Features Available
- Complete portfolio dashboard with $2.8M+ portfolio
- Holdings including VOO, MSFT, AAPL stocks
- Transaction history with recent trades
- Notifications and alerts
- Meeting scheduling system
- Profile management
- All 16 navigation tabs fully functional

## 🎯 No Database Required

This application now runs with a **complete mock backend** that provides:
- ✅ No PostgreSQL setup needed
- ✅ Instant startup with realistic data
- ✅ Full API compatibility
- ✅ Sample portfolio data for testing
- ✅ All endpoints functional

## 📱 Application Structure
DB_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=http://localhost:5173
```

**Frontend Environment (.env):**
```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Customer Portal
```

## � Development

### Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Database:**
```bash
docker-compose up
```

### Development URLs
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **Database:** localhost:5432

## 📋 Usage Guide

### Getting Started

1. **Create Account** - Register with email and secure password
2. **Verify Identity** - Complete identity verification process
3. **Connect Accounts** - Link investment accounts and portfolios
4. **Explore Dashboard** - Navigate through different sections

### Navigation Guide

#### Main Tabs
- **Overview** - Portfolio summary and key metrics
- **Holdings** - Detailed investment positions
- **Transactions** - Complete transaction history
- **Performance** - Advanced analytics and charts
- **Proposals** - Investment recommendations
- **Market Insights** - News and research
- **Documents** - Statements and reports
- **Tax Center** - Tax planning and optimization
- **Goals & Planning** - Financial goal tracking and planning tools
- **Reports** - Custom report generation and scheduling
- **Risk Management** - Risk monitoring and stress testing
- **Research Hub** - Investment research and analysis
- **Notifications** - Alerts and updates
- **Settings** - Account preferences
- **Schedule Meeting** - Book advisor consultations
- **Messages** - Secure communication

#### Key Features Usage

**Performance Analytics:**
- Select time periods (1M, 3M, 6M, 1Y, 3Y, 5Y)
- Switch between different chart views
- Compare performance against benchmarks
- Analyze risk metrics and attribution

**Investment Proposals:**
- Review advisor recommendations
- Analyze impact on portfolio allocation
- Approve or request modifications
- Track proposal status

**Document Center:**
- Search by document type or date
- Download statements and reports
- Organize with categories and tags
- Set up document alerts

**Market Insights:**
- Filter news by category
- Bookmark important articles
- View trending securities
- Access research reports

### User Roles & Permissions

**Client Users:**
- View portfolio and performance data
- Receive and respond to proposals
- Access documents and statements
- Communicate with advisors
- Manage account settings

**Advisor Users:**
- Access client portfolios
- Create investment proposals
- Upload documents
- Manage client communications
- Generate reports

## 🏗 Deployment

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview  # Test production build
```

**Backend:**
```bash
cd backend
npm run build
npm start  # Run production server
```

### Docker Deployment

**Build Images:**
```bash
# Frontend
cd frontend
docker build -t customer-portal-frontend .

# Backend  
cd ../backend
docker build -t customer-portal-backend .
```

**Deploy with Docker Compose:**
```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=3001
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=customerportal_prod
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-domain.com
SSL_CERT_PATH=/path/to/ssl/cert
SSL_KEY_PATH=/path/to/ssl/key
```

### Deployment Checklist

- [ ] Update environment variables
- [ ] Configure SSL certificates
- [ ] Set up database backups
- [ ] Configure monitoring and logging
- [ ] Test all functionality in staging
- [ ] Update DNS records
- [ ] Enable CDN for static assets
- [ ] Set up automated deployments

## � Development Guidelines

### Code Standards
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write unit tests for components and utilities
- Use conventional commit messages
- Document APIs and complex functions

### Component Architecture
- Keep components small and focused
- Use custom hooks for shared logic
- Implement proper error boundaries
- Follow accessibility best practices
- Use consistent naming conventions

### API Design
- RESTful endpoints with proper HTTP methods
- Consistent response formats
- Comprehensive error handling
- Input validation and sanitization
- Rate limiting and security headers

## � Testing

### Run Tests

**Frontend:**
```bash
cd frontend
npm test              # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run test:coverage # Generate coverage report
```

**Backend:**
```bash
cd backend
npm test              # Run API tests
npm run test:db       # Run database tests
npm run test:integration # Integration tests
```

### Test Credentials (Development)

**Sample User Accounts:**
```
Email: sarah@example.com
Password: password123
Role: Client

Email: advisor@example.com  
Password: password123
Role: Advisor
```

## � API Endpoints

### Health Check
- **Backend Health:** http://localhost:3001/health

### Authentication
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/register` - User registration

### Portfolio Management
- **GET** `/api/portfolio/summary` - Portfolio overview
- **GET** `/api/portfolio/holdings` - Current holdings
- **GET** `/api/portfolio/transactions` - Transaction history
- **GET** `/api/portfolio/performance` - Performance data

### User Management
- **GET** `/api/users/profile` - User profile
- **PUT** `/api/users/profile` - Update profile
- **GET** `/api/users/notifications` - Get notifications

### Dashboard & Analytics
- **GET** `/api/dashboard/metrics` - Dashboard metrics
- **GET** `/api/market/data` - Market data and indices

## 📊 Sample Data Overview

### Portfolio Summary
- **Total Value:** $2,847,320
- **YTD Performance:** +12.4%
- **Monthly Return:** +2.1%
- **Risk Score:** 7.2/10
- **Day Change:** +$87,450 (3.17%)

### Holdings (Sample)
- **VOO** - Vanguard S&P 500 ETF (850 shares, $358,147.50)
- **MSFT** - Microsoft Corporation (400 shares, $169,156.00)  
- **AAPL** - Apple Inc (300 shares, $56,838.00)

### Recent Transactions
- **Buy** - VOO 150 shares @ $421.35 (Sep 28, 2025)
- **Dividend** - MSFT $544.00 (Sep 25, 2025)
- **Sell** - TSLA 50 shares @ $251.05 (Sep 23, 2025)

## � Security Features

- **Authentication:** JWT-based with refresh tokens
- **Authorization:** Role-based access control
- **Data Encryption:** TLS 1.3 in transit, AES-256 at rest
- **Input Validation:** Comprehensive sanitization
- **Rate Limiting:** API endpoint protection
- **Security Headers:** CSRF, XSS, and clickjacking protection

## 📞 Support & Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill process using port
lsof -ti:3001 | xargs kill -9  # Backend port
lsof -ti:5173 | xargs kill -9  # Frontend port
```

**Mock Server Issues:**
```bash
# Restart mock backend
cd backend
npx ts-node src/completeMockServer.ts
```

**Build Errors:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

- **Documentation:** Check inline code comments and API docs
- **Issues:** Create GitHub issues for bugs and feature requests
- **Development:** Contact the development team
- **Production:** Use support ticketing system

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📈 Roadmap

### Upcoming Features
- [ ] Mobile application (React Native)
- [ ] Advanced charting with TradingView
- [ ] Real-time market data integration
- [ ] AI-powered investment insights
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] API rate limiting dashboard
- [ ] Enhanced security features
- [ ] Performance optimizations

---

**Built with ❤️ for asset management professionals and their clients.**