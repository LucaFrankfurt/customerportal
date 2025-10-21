# Customer Portal Frontend (Demo UI)

React + TypeScript + Vite + Tailwind CSS + shadcn/ui (customized).  
Designed as a client-facing asset management portal consuming a minimal mock backend (default: http://localhost:3001).

---

## Quick Start

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview
```

---

## High-Level Architecture

| Layer | Purpose |
|-------|---------|
| Pages (`src/pages`) | Route-level screens (landing, auth, dashboards, demos) |
| Feature Components (`src/components`) | Domain modules (portfolio, planning, risk, research, etc.) |
| UI Primitives (`src/components/ui`) | Re‑usable design system (buttons, cards, inputs, navigation, date pickers) |
| Lib (`src/lib`) | API wrapper + utilities |
| Theming | Tailwind + CSS variables + ThemeProvider (light/dark) |
| State | Local component state + browser storage (token, user) |
| Mock Data | Returned from simplified backend (no DB) |

---

## Routing / Pages

| Page | File | Purpose / Key Sections |
|------|------|------------------------|
| Landing | `pages/LandingPage.tsx` | Marketing hero, features, CTA to schedule demo / login |
| Schedule Demo | `pages/ScheduleDemo.tsx` | Demo request wizard w/ (simple date picker) |
| Login | `pages/Login.tsx` | Email/password auth, role-based redirect, error & loading states |
| Customer Dashboard | `pages/CustomerDashboard.tsx` | Aggregated navigation wrapper rendering all customer feature modules |
| Employee Dashboard | `pages/EmployeeDashboard.tsx` | (Light stub) placeholder for staff / RM features |
| Chat (Employee) | `pages/ChatPage.tsx` | Conversation view for employee side |
| Chat (Customer) | `pages/CustomerChatPage.tsx` | Conversation view for customer side |
| App Root | `App.tsx` | Basic router / layout composition |
| Main Entrypoint | `main.tsx` | React root + ThemeProvider |

---

## Customer Dashboard Feature Modules

| Module | File | Core Functions |
|--------|------|----------------|
| Overview | `components/Overview.tsx` | KPIs, allocation summary, top holdings, recent activity, news slice |
| Holdings | `components/Holdings.tsx` | Position table (symbol, qty, price, value, P/L), filters & search |
| Transactions | `components/Transactions.tsx` | Trade / cash flow history, type & status filters, export stub |
| Performance Analytics | `components/PerformanceAnalytics.tsx` | Return metrics, benchmark comparison, risk ratios (static / mock) |
| Investment Proposals | `components/InvestmentProposals.tsx` | Proposed allocations / ideas list, approval actions (local state) |
| Market Insights | `components/MarketInsights.tsx` | News items, macro highlights, watchlist style cards |
| Research Hub | `components/ResearchHub.tsx` | Analyst style reports, company research entries |
| Risk Management | `components/RiskManagement.tsx` | Risk metrics (VaR, beta, stress scenarios) – mock values |
| Tax Center | `components/TaxCenter.tsx` | Tax-loss opportunities, documents summary, projected savings |
| Goals & Planning | `components/GoalsPlanning.tsx` | Goal cards (retirement, milestones), progress bars, planning tabs |
| Reports & Analytics | `components/ReportsAnalytics.tsx` | Report templates, scheduling stub, generated report list |
| Schedule Meeting | `components/ScheduleMeeting.tsx` | Multi-step meeting scheduler (type → date/time → confirm) |
| Chat / Messaging | `components/Chat.tsx` | Message thread UI, sender alignment, status indicators |
| Notifications | `components/Notifications.tsx` | Filtered notification feed, mark-as-read local state |
| Documents | `components/DocumentCenter.tsx` | Document list, search, type filtering (statements, reports, tax) |
| Account Settings | `components/AccountSettings.tsx` | Preferences, profile subsections, communication toggles |
| Profile | `components/Profile.tsx` | Personal & financial profile, risk preference, editable sections |
| Stat Card | `components/StatCard.tsx` | Small KPI card (icon + value + delta) reused across dashboards |

---

## Shared UI Primitives

| Component | File | Notes |
|-----------|------|-------|
| Button / Variants | `ui/button.tsx`, `ui/button-variants.ts` | Size / variant classes |
| Card | `ui/card.tsx` | Surface container |
| Input / Textarea | `ui/input.tsx`, `ui/textarea.tsx` | Styled form controls |
| Checkbox | `ui/checkbox.tsx` | Controlled boolean |
| Badge | `ui/badge.tsx` | Status labels (success / warning / info) |
| Label | `ui/label.tsx` | Accessible form labeling |
| Navigation Menu (legacy / optional) | `ui/navigation-menu.tsx` | shadcn primitive (some logic replaced by grouped custom nav) |
| Date Pickers | `ui/simple-date-picker.tsx` (active), `ui/date-picker.tsx` (deprecated) | Using simplified native-backed picker for reliability |
| Popover | `ui/popover.tsx` | Radix-based popover wrapper |
| Calendar (deprecated) | `ui/calendar.tsx` + `ui/calendar.css` | Legacy styling kept for reference |
| Section Header | `ui/section-header.tsx` | Consistent heading pattern |

---

## Helper / Integration

| File | Purpose |
|------|---------|
| `lib/api.ts` | Centralized fetch wrappers (login, portfolio, meetings, etc.) |
| `lib/utils.ts` | Formatting helpers (numbers, dates, class merge) |
| `components/ThemeProvider.tsx` | Dark/light mode context |
| `components/ThemeSwitcher.tsx` | User toggle for theme |
| `components/Header.tsx` | Top navigation bar (logo, actions, auth state) |
| `components/Footer.tsx` | Landing page footer |
| `components/Hero.tsx`, `components/Features.tsx` | Landing page marketing sections |

---

## Data Flow (Demo Mode)

1. User logs in → token + user object stored (typically localStorage).
2. Dashboard mounts → parallel calls (summary, holdings, transactions, notifications).
3. Feature modules request only their needed slices (mock responses).
4. Actions (schedule meeting, send message) mutate in-memory structures; UI updates immediately.

---

## Authentication

| Aspect | Notes |
|--------|-------|
| Method | Email + password (mock validation) |
| Storage | Local storage token (simple) |
| Roles (planned / partial) | customer, employee (UI branches) |
| Protection | Frontend conditional rendering (no full route guard in demo) |

---

## Styling & Theming

- Tailwind utility-first approach.
- Light/Dark via CSS variables.
- Consistent spacing & typography tokens through Tailwind config.

---

## Extensibility Points

| Area | How to Extend |
|------|---------------|
| API | Replace `lib/api.ts` endpoints with real backend URLs |
| State | Introduce React Query / Zustand for server caching |
| Auth | Add refresh tokens + guarded routes (React Router) |
| Data Viz | Integrate chart lib (Recharts / ECharts) in Performance & Risk |
| Documents | Connect to storage service (S3 / GCS) |
| Real-Time | Swap Chat messages with WebSocket implementation |

---

## Testing (Suggested)

| Layer | Approach |
|-------|---------|
| Components | Vitest + React Testing Library |
| Utils | Pure function unit tests |
| Pages | Snapshot + interaction tests |
| API | Contract tests once real backend exists |

---

## Environment / Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint sources |

---

## Known Simplifications

- Calendar & advanced date picker replaced by simple picker for reliability.
- No persistent storage (mock data resets on refresh if not cached).
- No pagination or server filtering (client-side only).
- Some modules show placeholder / representative analytics.

---

## Demo Credentials (If Backed by Mock API)

| Role | Email | Password |
|------|-------|----------|
| Customer | `customer@example.com` | `password123` |
| Employee (sample) | `employee@example.com` | `password123` |

---

## Adding a New Feature Module (Pattern)

1. Create component in `src/components/NewFeature.tsx`.
2. Expose UI: add tab / grouped nav entry in `CustomerDashboard.tsx`.
3. Add API helper (if needed) in `lib/api.ts`.
4. Wire load effect + local state.
5. Add cards / tables using existing primitives.

---

## Code Style Guidelines

- Functional components with explicit `React.FC` when props generic helpful.
- Keep derived values memoized if heavy (currently simple enough to inline).
- Use semantic naming for domain elements (holding, transaction, proposal).
- Prefer composition over deep prop drilling (split into focused subcomponents if complexity rises).

---

## File Map (Condensed)

```
src/
  pages/ (route-level)
  components/
    (domain modules + layout + marketing)
    ui/ (primitives)
  lib/
  assets/
  main.tsx / App.tsx
```

---

## Upgrade Path (Real Backend)

| Step | Action |
|------|--------|
| 1 | Point `API_BASE` in `lib/api.ts` to real service |
| 2 | Implement auth refresh + error interceptor |
| 3 | Introduce query library for cache & invalidation |
| 4 | Replace mock metrics with real analytics endpoints |
| 5 | Harden forms (Zod validation, error surfaces) |

---

## License / Usage

Demo-only frontend for showcasing an asset management portal. Replace mock services before production use.

---

## Summary

All screens and functional domains (portfolio, analytics, planning, tax, research, risk, communication, documents, account) are implemented with modular components and a light abstraction layer ready for wiring to a real backend.

---
