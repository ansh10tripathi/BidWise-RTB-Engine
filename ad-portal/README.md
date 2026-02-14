# 🎯 BidWise Ad Portal

Modern enterprise SaaS dashboard for BidWise RTB optimization engine.

## 🎨 Design Features

- **Dark Theme Default** - Professional dark background (#0f172a)
- **Glassmorphism UI** - Modern glass cards with backdrop blur
- **Cyan Accent** - Clean accent color (#22d3ee)
- **Animated KPIs** - Smooth hover transitions and animations
- **Responsive Design** - Mobile-first approach
- **Enterprise SaaS Style** - Google Ads / DSP inspired

## 🛠 Tech Stack

- **Next.js 14** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Modern icons

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
ad-portal/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── GlassCard.tsx       # Reusable glass card
│   ├── KPICard.tsx         # Animated KPI cards
│   ├── PerformanceChart.tsx # Line charts
│   ├── CampaignTable.tsx   # Data table
│   ├── StrategyComparison.tsx # Bar chart
│   └── Header.tsx          # Navigation header
├── lib/
│   └── mockData.ts         # Mock RTB data
├── types/
│   └── rtb.ts              # TypeScript types
└── tailwind.config.ts      # Tailwind configuration
```

## 🎯 Key Components

### KPICard
Animated metric cards with icons, trends, and hover effects.

### PerformanceChart
Line charts for hourly performance tracking.

### CampaignTable
Sortable table for campaign performance data.

### StrategyComparison
Bar chart comparing baseline vs optimized strategies.

## 🎨 Design System

### Colors
- Background: `#0f172a`
- Glass Card: `rgba(255, 255, 255, 0.05)`
- Border: `rgba(255, 255, 255, 0.1)`
- Accent: `#22d3ee` (cyan)

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, white
- Body: Regular, gray-300
- Labels: Small, gray-400

## 📊 Features

- Real-time KPI monitoring
- Campaign performance tracking
- Hourly performance trends
- Strategy comparison (Baseline vs Optimized)
- Budget tracking
- CTR/CVR analytics

## 🔮 Future Enhancements

- Backend API integration
- Real-time WebSocket updates
- Advanced filtering and sorting
- Export to CSV/PDF
- Custom date range selection
- Multi-campaign comparison

---

Built with ❤️ for BidWise RTB
