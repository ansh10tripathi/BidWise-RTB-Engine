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
import { apiClient } from "@/lib/api/client";
import { Campaign } from "@/types/campaign";
import { MetricsResponse, AnalyticsResponse } from "@/types/api";

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [baselineMetrics, setBaselineMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await apiClient.getCampaigns();
        setCampaigns(data);
        if (data.length > 0) {
          setSelectedCampaign(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (!selectedCampaign) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [metricsData, analyticsData] = await Promise.all([
          apiClient.getMetrics(selectedCampaign.id),
          apiClient.getAnalytics(selectedCampaign.id),
        ]);
        
        setMetrics(metricsData);
        setAnalytics(analyticsData);

        if (selectedCampaign.strategy === "optimized") {
          const baselineRes = await fetch("http://localhost:8000/baseline");
          if (baselineRes.ok) {
            setBaselineMetrics(await baselineRes.json());
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCampaign]);

  const calculateImprovement = (current: number, baseline: number) => {
    if (!baseline || baseline === 0) return 0;
    return ((current - baseline) / baseline) * 100;
  };

  const clickImprovement = baselineMetrics ? calculateImprovement(metrics?.total_clicks || 0, baselineMetrics.clicks) : 0;
  const conversionImprovement = baselineMetrics ? calculateImprovement(metrics?.total_conversions || 0, baselineMetrics.conversions) : 0;
  const scoreImprovement = baselineMetrics ? calculateImprovement(metrics?.score || 0, baselineMetrics.score) : 0;
  const ctrImprovement = baselineMetrics && metrics ? calculateImprovement(metrics.ctr, (baselineMetrics.clicks / 10000) * 100) : 0;
  const cvrImprovement = baselineMetrics && metrics ? calculateImprovement(metrics.cvr, (baselineMetrics.conversions / baselineMetrics.clicks) * 100) : 0;

  if (loading || !metrics || !analytics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (!selectedCampaign) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-white mb-2">No Campaigns Found</h2>
          <p className="text-slate-400">Create a campaign to get started</p>
        </div>
      </div>
    );
  }

  const comparisonData = baselineMetrics ? [
    { metric: "Clicks", Baseline: baselineMetrics.clicks, Optimized: metrics.total_clicks },
    { metric: "Conversions", Baseline: baselineMetrics.conversions, Optimized: metrics.total_conversions },
    { metric: "Score", Baseline: baselineMetrics.score, Optimized: metrics.score },
  ] : [];

  return (
    <div className="space-y-10 pb-10 p-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Campaign Dashboard</h1>
          <p className="text-slate-400 text-sm">{selectedCampaign.campaign_name}</p>
        </div>
        <div className="flex items-center gap-4">
          {campaigns.length > 1 && (
            <select
              value={selectedCampaign.id}
              onChange={(e) => {
                const campaign = campaigns.find(c => c.id === e.target.value);
                if (campaign) setSelectedCampaign(campaign);
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
            >
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id} className="bg-slate-900">
                  {campaign.campaign_name}
                </option>
              ))}
            </select>
          )}
          <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Section */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-6">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Budget"
            value={`$${selectedCampaign.total_budget.toLocaleString()}`}
            icon={Wallet}
            color="green"
          />
          <MetricCard
            title="Total Spent"
            value={`$${metrics.total_spent.toLocaleString()}`}
            subtitle={`${((metrics.total_spent / selectedCampaign.total_budget) * 100).toFixed(1)}% used`}
            icon={DollarSign}
            color="cyan"
          />
          <MetricCard
            title="Total Clicks"
            value={metrics.total_clicks.toLocaleString()}
            icon={MousePointerClick}
            trend={selectedCampaign.strategy === "optimized" && baselineMetrics ? { value: clickImprovement, isPositive: clickImprovement > 0 } : undefined}
            color="blue"
          />
          <MetricCard
            title="Conversions"
            value={metrics.total_conversions}
            icon={Target}
            trend={selectedCampaign.strategy === "optimized" && baselineMetrics ? { value: conversionImprovement, isPositive: conversionImprovement > 0 } : undefined}
            color="purple"
          />
          <MetricCard
            title="CTR"
            value={`${metrics.ctr.toFixed(2)}%`}
            subtitle="Click-through rate"
            icon={Percent}
            trend={selectedCampaign.strategy === "optimized" && baselineMetrics ? { value: ctrImprovement, isPositive: ctrImprovement > 0 } : undefined}
            color="cyan"
          />
          <MetricCard
            title="CVR"
            value={`${metrics.cvr.toFixed(2)}%`}
            subtitle="Conversion rate"
            icon={TrendingUp}
            trend={selectedCampaign.strategy === "optimized" && baselineMetrics ? { value: cvrImprovement, isPositive: cvrImprovement > 0 } : undefined}
            color="green"
          />
          <MetricCard
            title="Total Score"
            value={metrics.score}
            subtitle={`Clicks + ${selectedCampaign.conversion_weight}×Conversions`}
            icon={Award}
            trend={selectedCampaign.strategy === "optimized" && baselineMetrics ? { value: scoreImprovement, isPositive: scoreImprovement > 0 } : undefined}
            color="orange"
          />
          {selectedCampaign.strategy === "optimized" && baselineMetrics && (
            <MetricCard
              title="Performance"
              value={`${scoreImprovement > 0 ? '+' : ''}${scoreImprovement.toFixed(1)}%`}
              subtitle="vs baseline"
              icon={Zap}
              color="pink"
            />
          )}
        </div>
      </section>

      <div className="border-t border-slate-800"></div>

      {selectedCampaign.strategy === "optimized" && comparisonData.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Performance Comparison</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ComparisonChart title="Baseline vs Optimized" data={comparisonData} />
            <BudgetPieChart title="Budget Usage" spent={metrics.total_spent} remaining={metrics.remaining_budget} />
          </div>
        </section>
      )}

      <div className="border-t border-slate-800"></div>

      <section>
        <h2 className="text-lg font-semibold text-white mb-6">Hourly Analysis</h2>
        <div className="grid grid-cols-1 gap-8">
          <HourlyChart title="Hourly Performance" data={analytics.hourly_performance} />
          <HourlyHeatmap 
            data={analytics.hourly_performance.map(h => ({ 
              hour: h.hour, 
              value: h.clicks, 
              label: `${h.clicks} clicks` 
            }))} 
            title="24-Hour Activity Heatmap" 
          />
        </div>
      </section>

      <div className="border-t border-slate-800"></div>

      <section>
        <h2 className="text-lg font-semibold text-white mb-6">Advanced Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FeatureImportanceChart title="Feature Importance" data={analytics.feature_importance} />
          <DevicePerformance 
            mobile={analytics.device_performance.mobile} 
            desktop={analytics.device_performance.desktop} 
          />
          <AdvancedMetrics 
            modelConfidence={87} 
            roi={Math.round((metrics.score / metrics.total_spent) * 100)} 
            burnRate={Math.round(metrics.total_spent / 4)} 
            daysRemaining={Math.ceil(metrics.remaining_budget / (metrics.total_spent / 4))} 
          />
        </div>
      </section>
    </div>
  );
}
