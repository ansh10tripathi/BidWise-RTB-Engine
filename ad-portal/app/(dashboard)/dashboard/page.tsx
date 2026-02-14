"use client";

import { useState, useEffect } from "react";
import MetricCard from "@/components/ui/MetricCard";
import ComparisonChart from "@/components/charts/ComparisonChart";
import TrendChart from "@/components/charts/TrendChart";
import BudgetPieChart from "@/components/charts/BudgetPieChart";
import HourlyChart from "@/components/charts/HourlyChart";
import HourlyHeatmap from "@/components/charts/HourlyHeatmap";
import FeatureImportanceChart from "@/components/charts/FeatureImportanceChart";
import DevicePerformance from "@/components/charts/DevicePerformance";
import AdvancedMetrics from "@/components/charts/AdvancedMetrics";
import { DollarSign, MousePointerClick, Target, Percent, Award, TrendingUp, Wallet, Zap } from "lucide-react";

export default function DashboardPage() {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh metrics every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Fetch metrics here when API is ready
      // apiClient.getMetrics(campaignId).then(setKpiData);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  // Mock data
  const kpiData = {
    budget: 10000,
    spent: 9920.8,
    clicks: 1580,
    conversions: 142,
    ctr: 4.11,
    cvr: 8.99,
    score: 1722,
    improvement: 29.1,
  };

  const comparisonData = [
    { metric: "Clicks", Baseline: 1245, Optimized: 1580 },
    { metric: "Conversions", Baseline: 89, Optimized: 142 },
    { metric: "Score", Baseline: 1334, Optimized: 1722 },
  ];

  const scoreTrendData = [
    { day: "Day 1", score: 1420 },
    { day: "Day 2", score: 1550 },
    { day: "Day 3", score: 1680 },
    { day: "Day 4", score: 1722 },
  ];

  const hourlyData = [
    { hour: 0, clicks: 42, conversions: 3, ctr: 3.28 },
    { hour: 6, clicks: 55, conversions: 5, ctr: 3.79 },
    { hour: 10, clicks: 78, conversions: 8, ctr: 4.22 },
    { hour: 14, clicks: 92, conversions: 10, ctr: 4.42 },
    { hour: 18, clicks: 128, conversions: 15, ctr: 5.08 },
    { hour: 20, clicks: 148, conversions: 18, ctr: 5.32 },
    { hour: 22, clicks: 138, conversions: 14, ctr: 5.21 },
  ];

  const featureData = [
    { feature: "Hour", importance: 0.35 },
    { feature: "Campaign", importance: 0.28 },
    { feature: "Device", importance: 0.22 },
    { feature: "Floor Price", importance: 0.15 },
  ];

  const deviceData = {
    mobile: { clicks: 890, conversions: 85, ctr: 4.52, cvr: 9.55 },
    desktop: { clicks: 690, conversions: 57, ctr: 3.58, cvr: 8.26 },
  };

  const heatmapData = [
    { hour: 0, value: 42, label: "42 clicks" },
    { hour: 1, value: 35, label: "35 clicks" },
    { hour: 2, value: 28, label: "28 clicks" },
    { hour: 3, value: 22, label: "22 clicks" },
    { hour: 4, value: 18, label: "18 clicks" },
    { hour: 5, value: 25, label: "25 clicks" },
    { hour: 6, value: 55, label: "55 clicks" },
    { hour: 7, value: 68, label: "68 clicks" },
    { hour: 8, value: 72, label: "72 clicks" },
    { hour: 9, value: 75, label: "75 clicks" },
    { hour: 10, value: 78, label: "78 clicks" },
    { hour: 11, value: 82, label: "82 clicks" },
    { hour: 12, value: 88, label: "88 clicks" },
    { hour: 13, value: 85, label: "85 clicks" },
    { hour: 14, value: 92, label: "92 clicks" },
    { hour: 15, value: 95, label: "95 clicks" },
    { hour: 16, value: 105, label: "105 clicks" },
    { hour: 17, value: 118, label: "118 clicks" },
    { hour: 18, value: 128, label: "128 clicks" },
    { hour: 19, value: 135, label: "135 clicks" },
    { hour: 20, value: 148, label: "148 clicks" },
    { hour: 21, value: 142, label: "142 clicks" },
    { hour: 22, value: 138, label: "138 clicks" },
    { hour: 23, value: 95, label: "95 clicks" },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Campaign Dashboard</h1>
          <p className="text-sm text-gray-400">Real-time performance analytics</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-green-500/10 border border-green-500/20 rounded-lg shadow-lg shadow-green-500/5">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400 font-medium">Live</span>
        </div>
      </div>

      {/* KPI Cards Section */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Total Budget"
            value={`$${kpiData.budget.toLocaleString()}`}
            icon={Wallet}
            color="green"
          />
          <MetricCard
            title="Total Spent"
            value={`$${kpiData.spent.toLocaleString()}`}
            subtitle={`${((kpiData.spent / kpiData.budget) * 100).toFixed(1)}% used`}
            icon={DollarSign}
            color="cyan"
          />
          <MetricCard
            title="Total Clicks"
            value={kpiData.clicks.toLocaleString()}
            icon={MousePointerClick}
            trend={{ value: 26.9, isPositive: true }}
            color="blue"
          />
          <MetricCard
            title="Conversions"
            value={kpiData.conversions}
            icon={Target}
            trend={{ value: 59.6, isPositive: true }}
            color="purple"
          />
          <MetricCard
            title="CTR"
            value={`${kpiData.ctr}%`}
            subtitle="Click-through rate"
            icon={Percent}
            trend={{ value: 49.5, isPositive: true }}
            color="cyan"
          />
          <MetricCard
            title="CVR"
            value={`${kpiData.cvr}%`}
            subtitle="Conversion rate"
            icon={TrendingUp}
            trend={{ value: 25.7, isPositive: true }}
            color="green"
          />
          <MetricCard
            title="Total Score"
            value={kpiData.score}
            subtitle="Clicks + 10×Conversions"
            icon={Award}
            trend={{ value: 29.1, isPositive: true }}
            color="orange"
          />
          <MetricCard
            title="Performance"
            value={`+${kpiData.improvement}%`}
            subtitle="vs baseline"
            icon={Zap}
            color="pink"
          />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/5"></div>

      {/* Performance Comparison Section */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Performance Comparison</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ComparisonChart title="Baseline vs Optimized" data={comparisonData} />
          <TrendChart title="Score Trend" data={scoreTrendData} dataKey="score" xAxisKey="day" />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/5"></div>

      {/* Budget & Hourly Analysis Section */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Budget & Hourly Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <BudgetPieChart title="Budget Usage" spent={kpiData.spent} remaining={kpiData.budget - kpiData.spent} />
          <HourlyChart title="Hourly Performance" data={hourlyData} />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/5"></div>

      {/* Advanced Analytics Section */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Advanced Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <FeatureImportanceChart title="Feature Importance" data={featureData} />
          <DevicePerformance mobile={deviceData.mobile} desktop={deviceData.desktop} />
          <AdvancedMetrics modelConfidence={87} roi={245} burnRate={2480} daysRemaining={3} />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/5"></div>

      {/* Heatmap Section */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Activity Heatmap</h2>
        <HourlyHeatmap data={heatmapData} title="24-Hour Activity Heatmap" />
      </section>
    </div>
  );
}
