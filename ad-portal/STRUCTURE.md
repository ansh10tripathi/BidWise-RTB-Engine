# 📁 BidWise Ad Portal - Project Structure

```
ad-portal/
├── app/
│   ├── (dashboard)/              # Route group with sidebar layout
│   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Dashboard page
│   │   ├── campaigns/
│   │   │   └── page.tsx         # Campaigns page
│   │   ├── analytics/
│   │   │   └── page.tsx         # Analytics page
│   │   └── settings/
│   │       └── page.tsx         # Settings page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Root page (redirects to /dashboard)
│   └── globals.css              # Global styles
│
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── charts/                  # Chart components
│   │   ├── LineChart.tsx
│   │   └── BarChart.tsx
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── TopBar.tsx               # Top navigation bar
│   ├── GlassCard.tsx            # Legacy glass card
│   ├── KPICard.tsx              # Legacy KPI card
│   ├── Header.tsx               # Legacy header
│   ├── PerformanceChart.tsx     # Legacy chart
│   ├── CampaignTable.tsx        # Legacy table
│   └── StrategyComparison.tsx   # Legacy comparison
│
├── hooks/
│   └── useFetch.ts              # Custom data fetching hook
│
├── lib/
│   ├── api/
│   │   └── client.ts            # API client wrapper
│   └── mockData.ts              # Mock data
│
├── types/
│   └── rtb.ts                   # TypeScript types
│
├── .vscode/
│   └── settings.json            # VS Code settings
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── .env.local
├── .gitignore
└── README.md
```

## 🎯 Key Features

### Layout Structure
- **Route Groups**: `(dashboard)` for sidebar layout
- **Nested Layouts**: Dashboard layout wraps all dashboard pages
- **Sidebar Navigation**: Fixed left sidebar with active states
- **Top Bar**: Fixed header with notifications and user menu

### Components Organization
- **ui/**: Base UI components (Button, Card)
- **charts/**: Recharts wrappers (LineChart, BarChart)
- **Layout Components**: Sidebar, TopBar

### API Integration
- **API Client**: Centralized HTTP client in `lib/api/client.ts`
- **Custom Hooks**: `useFetch` for data fetching
- **Environment Variables**: `.env.local` for API URL

### Pages
- **/dashboard**: Main dashboard with KPIs
- **/campaigns**: Campaign management
- **/analytics**: Performance analytics
- **/settings**: Account settings

## 🚀 Usage

```bash
npm run dev
```

Navigate to:
- http://localhost:3000 → redirects to /dashboard
- http://localhost:3000/dashboard
- http://localhost:3000/campaigns
- http://localhost:3000/analytics
- http://localhost:3000/settings
