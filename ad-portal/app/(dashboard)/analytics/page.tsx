"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api/client";
import { Campaign } from "@/types/campaign";
import Card from "@/components/ui/Card";
import HourlyChart from "@/components/charts/HourlyChart";
import FeatureImportanceChart from "@/components/charts/FeatureImportanceChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface EDAData {
  total_rows: number;
  total_clicks: number;
  total_conversions: number;
  ctr: number;
  cvr: number;
  avg_market_price: number;
  device_distribution: { [key: string]: number };
}

interface HourlyData {
  hour: number;
  clicks: number;
  conversions: number;
  ctr: number;
}

interface HistogramData {
  range: string;
  count: number;
}

interface FeatureData {
  feature: string;
  importance: number;
}

interface ConfidenceData {
  avg_ctr_confidence: number;
  avg_cvr_confidence: number;
}

export default function AnalyticsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [eda, setEda] = useState<EDAData | null>(null);
  const [hourly, setHourly] = useState<HourlyData[]>([]);
  const [histogram, setHistogram] = useState<HistogramData[]>([]);
  const [featureImportance, setFeatureImportance] = useState<FeatureData[]>([]);
  const [confidence, setConfidence] = useState<ConfidenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [error, setError] = useState<string | null>(null);

  // Fetch campaigns
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
        setError("Failed to load campaigns");
      }
    };
    fetchCampaigns();
  }, []);

  // Fetch analytics data
  useEffect(() => {
    if (!selectedCampaign) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [edaRes, hourlyRes, histogramRes, featureRes, confidenceRes] = await Promise.all([
          fetch("http://localhost:8000/eda"),
          fetch("http://localhost:8000/analytics/hourly"),
          fetch("http://localhost:8000/analytics/market-price"),
          fetch("http://localhost:8000/analytics/feature-importance"),
          fetch("http://localhost:8000/analytics/confidence"),
        ]);

        if (!edaRes.ok) throw new Error("Failed to fetch analytics data");

        setEda(await edaRes.json());
        setHourly(await hourlyRes.json());
        setHistogram(await histogramRes.json());
        setFeatureImportance(await featureRes.json());
        setConfidence(await confidenceRes.json());
        setApiStatus('connected');
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        setError("Failed to connect to API");
        setApiStatus('disconnected');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCampaign]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!selectedCampaign) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-white mb-2">No Campaigns Found</h2>
          <p className="text-gray-400">Create a campaign to view analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Analytics</h1>
          <p className="text-sm text-gray-400">{selectedCampaign.campaign_name}</p>
        </div>
        <div className="flex items-center gap-4">
          {campaigns.length > 1 && (
            <select
              value={selectedCampaign.id}
              onChange={(e) => {
                const campaign = campaigns.find(c => c.id === e.target.value);
                if (campaign) setSelectedCampaign(campaign);
              }}
              className="px-4 py-2 bg-slate-800/50 text-white rounded-lg border border-white/10 focus:outline-none focus:border-cyan-500"
            >
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.campaign_name}
                </option>
              ))}
            </select>
          )}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            apiStatus === 'connected'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              apiStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'
            }`} />
            {apiStatus === 'connected' ? 'Connected' : 'Disconnected'}
          </div>
        </div>
      </div>

      {/* Dataset Insights (EDA) */}
      {eda && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">📊 Dataset Insights</h2>
          
          {/* Top row - 4 stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
              <p className="text-xs uppercase tracking-wider text-slate-400">Total Rows</p>
              <p className="text-2xl font-bold text-white mt-2">{eda.total_rows.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
              <p className="text-xs uppercase tracking-wider text-slate-400">Total Clicks</p>
              <p className="text-2xl font-bold text-white mt-2">{eda.total_clicks.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
              <p className="text-xs uppercase tracking-wider text-slate-400">Total Conversions</p>
              <p className="text-2xl font-bold text-white mt-2">{eda.total_conversions.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
              <p className="text-xs uppercase tracking-wider text-slate-400">Avg Market Price</p>
              <p className="text-2xl font-bold text-white mt-2">${eda.avg_market_price.toFixed(2)}</p>
            </div>
          </div>

          {/* Second row - 3 stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
              <p className="text-xs uppercase tracking-wider text-slate-400">CTR</p>
              <p className="text-2xl font-bold text-white mt-2">{(eda.ctr * 100).toFixed(2)}%</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
              <p className="text-xs uppercase tracking-wider text-slate-400">CVR</p>
              <p className="text-2xl font-bold text-white mt-2">{(eda.cvr * 100).toFixed(2)}%</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
              <p className="text-xs uppercase tracking-wider text-slate-400">Device Distribution</p>
              <div className="mt-2 space-y-1">
                {Object.entries(eda.device_distribution).map(([device, percentage]) => (
                  <div key={device} className="text-slate-300 text-sm">
                    Device {device}: {(percentage * 100).toFixed(1)}%
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="border-t border-white/5"></div>

      {/* Hourly Performance */}
      {hourly.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">⏰ Hourly Performance</h2>
          <HourlyChart title="24-Hour Performance Breakdown" data={hourly} />
        </section>
      )}

      {/* Divider */}
      <div className="border-t border-white/5"></div>

      {/* Market Price & Feature Importance */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">📈 Advanced Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Price Histogram */}
          {histogram.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-white mb-6">Market Price Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={histogram}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="range" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Feature Importance */}
          {featureImportance.length > 0 && (
            <FeatureImportanceChart title="ML Feature Importance" data={featureImportance} />
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/5"></div>

      {/* Model Confidence */}
      {confidence && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🤖 Model Confidence</h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-cyan-400 text-sm mb-2">CTR Model Confidence</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-4xl font-bold text-white">
                        {(confidence.avg_ctr_confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-slate-700">
                    <div
                      style={{ width: `${(confidence.avg_ctr_confidence * 100).toFixed(1)}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-cyan-500 to-blue-500"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-purple-400 text-sm mb-2">CVR Model Confidence</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-4xl font-bold text-white">
                        {(confidence.avg_cvr_confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-slate-700">
                    <div
                      style={{ width: `${(confidence.avg_cvr_confidence * 100).toFixed(1)}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-pink-500"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}
