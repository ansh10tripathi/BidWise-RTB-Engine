'use client'

import { useState, useEffect } from 'react'
import { RTBData, KPIData, ChartData, BudgetData } from '../types'
import KpiCard from '../components/KpiCard'
import StrategyCard from '../components/StrategyCard'
import ChartsSection from '../components/ChartsSection'
import PerformanceBanner from '../components/PerformanceBanner'
import LoadingSkeleton from '../components/LoadingSkeleton'
import EdaCharts from '../components/EdaCharts'
import HourlyTrendChart from '../components/HourlyTrendChart'
import MarketPriceHistogram from '../components/MarketPriceHistogram'
import FeatureImportanceChart from '../components/FeatureImportanceChart'
import ModelConfidenceCard from '../components/ModelConfidenceCard'

interface EDAData {
  total_rows: number
  total_clicks: number
  total_conversions: number
  ctr: number
  cvr: number
  avg_market_price: number
  device_distribution: { [key: string]: number }
}

interface HourlyData {
  hour: number
  clicks: number
  conversions: number
}

interface HistogramData {
  range: string
  count: number
}

interface FeatureData {
  feature: string
  importance: number
}

interface ConfidenceData {
  avg_ctr_confidence: number
  avg_cvr_confidence: number
}

interface Campaign {
  id: string
  campaign_name: string
  total_budget: number
  base_bid: number
  strategy: string
  conversion_weight: number
  device_targeting: string
  active_hours: number[]
  status: string
}

interface Metrics {
  total_impressions: number
  total_clicks: number
  total_conversions: number
  total_spent: number
  remaining_budget: number
  ctr: number
  cvr: number
  score: number
  avg_cpc: number
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [campaignMetrics, setCampaignMetrics] = useState<Metrics | null>(null)
  const [baselineMetrics, setBaselineMetrics] = useState<Metrics | null>(null)
  const [eda, setEda] = useState<EDAData | null>(null)
  const [hourly, setHourly] = useState<HourlyData[]>([])
  const [histogram, setHistogram] = useState<HistogramData[]>([])
  const [featureImportance, setFeatureImportance] = useState<FeatureData[]>([])
  const [confidence, setConfidence] = useState<ConfidenceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected'>('disconnected')
  const [error, setError] = useState<string | null>(null)

  // Fetch campaigns on mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/campaigns')
        if (res.ok) {
          const data = await res.json()
          setCampaigns(data)
          if (data.length > 0) {
            setSelectedCampaign(data[0])
          }
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
      }
    }
    fetchCampaigns()
  }, [])

  // Fetch data when campaign changes
  useEffect(() => {
    if (!selectedCampaign) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch campaign metrics and baseline comparison
        const [metricsRes, edaRes, hourlyRes, histogramRes, featureRes, confidenceRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/campaigns/${selectedCampaign.id}/metrics`),
          fetch('http://127.0.0.1:8000/eda'),
          fetch('http://127.0.0.1:8000/analytics/hourly'),
          fetch('http://127.0.0.1:8000/analytics/market-price'),
          fetch('http://127.0.0.1:8000/analytics/feature-importance'),
          fetch('http://127.0.0.1:8000/analytics/confidence')
        ])
        
        if (!metricsRes.ok) {
          throw new Error('Failed to fetch campaign metrics')
        }
        
        const metrics = await metricsRes.json()
        setCampaignMetrics(metrics)
        
        // Fetch baseline comparison if campaign is optimized
        if (selectedCampaign.strategy === 'optimized') {
          const baselineRes = await fetch('http://127.0.0.1:8000/baseline')
          if (baselineRes.ok) {
            const baselineData = await baselineRes.json()
            // Convert baseline format to metrics format
            setBaselineMetrics({
              total_impressions: 0,
              total_clicks: baselineData.clicks,
              total_conversions: baselineData.conversions,
              total_spent: 0,
              remaining_budget: baselineData.remaining_budget,
              ctr: 0,
              cvr: 0,
              score: baselineData.score,
              avg_cpc: 0
            })
          }
        } else {
          setBaselineMetrics(null)
        }
        
        setEda(await edaRes.json())
        setHourly(await hourlyRes.json())
        setHistogram(await histogramRes.json())
        setFeatureImportance(await featureRes.json())
        setConfidence(await confidenceRes.json())
        setApiStatus('connected')
      } catch (error) {
        console.error('Failed to fetch data:', error)
        setError('Failed to connect to API')
        setApiStatus('disconnected')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCampaign])

  // Calculate dynamic KPIs
  const kpiData: KPIData | null = campaignMetrics && baselineMetrics ? {
    clickDifference: campaignMetrics.total_clicks - baselineMetrics.total_clicks,
    conversionDifference: campaignMetrics.total_conversions - baselineMetrics.total_conversions,
    scoreDifference: campaignMetrics.score - baselineMetrics.score,
    budgetEfficiency: baselineMetrics.total_spent > 0 
      ? (campaignMetrics.total_spent / baselineMetrics.total_spent) * 100 
      : 100
  } : null

  // Calculate dynamic improvement percentage
  const improvement = campaignMetrics && baselineMetrics && baselineMetrics.score > 0
    ? ((campaignMetrics.score - baselineMetrics.score) / baselineMetrics.score) * 100 
    : 0

  const chartData: ChartData[] = campaignMetrics && baselineMetrics ? [
    { name: 'Baseline', clicks: baselineMetrics.total_clicks, score: baselineMetrics.score },
    { name: 'Optimized', clicks: campaignMetrics.total_clicks, score: campaignMetrics.score }
  ] : []

  const budgetData: BudgetData[] = campaignMetrics && selectedCampaign ? [
    { name: 'Used', value: campaignMetrics.total_spent },
    { name: 'Remaining', value: campaignMetrics.remaining_budget }
  ] : []

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-slate-400">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!selectedCampaign) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-white mb-2">No Campaigns Found</h2>
          <p className="text-slate-400">Create a campaign to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 pb-8 border-b border-white/20">
          <div>
            <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">BidWise RTB Engine</h1>
            <p className="text-slate-400 text-lg">Campaign: {selectedCampaign.campaign_name}</p>
          </div>
          <div className="flex items-center gap-4">
            {campaigns.length > 1 && (
              <select
                value={selectedCampaign.id}
                onChange={(e) => {
                  const campaign = campaigns.find(c => c.id === e.target.value)
                  if (campaign) setSelectedCampaign(campaign)
                }}
                className="px-4 py-3 bg-slate-800 text-white rounded-xl border border-white/20 focus:outline-none focus:border-cyan-500 transition-all"
              >
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.campaign_name}
                  </option>
                ))}
              </select>
            )}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border-2 ${
              apiStatus === 'connected' 
                ? 'bg-green-500/20 text-green-400 border-green-500/40' 
                : 'bg-red-500/20 text-red-400 border-red-500/40'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                apiStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'
              }`} />
              {apiStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </div>
          </div>
        </div>

        {/* Campaign Metrics */}
        {campaignMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <KpiCard 
              title="Total Impressions" 
              value={campaignMetrics.total_impressions.toLocaleString()}
              icon="👁️"
              trend="neutral"
            />
            <KpiCard 
              title="Total Clicks" 
              value={campaignMetrics.total_clicks.toLocaleString()}
              icon="👆"
              trend="up"
            />
            <KpiCard 
              title="Total Conversions" 
              value={campaignMetrics.total_conversions.toLocaleString()}
              icon="🎯"
              trend="up"
            />
            <KpiCard 
              title="Campaign Score" 
              value={campaignMetrics.score.toLocaleString()}
              icon="📊"
              trend="up"
            />
          </div>
        )}

        {/* Performance Metrics */}
        {campaignMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <KpiCard 
              title="CTR" 
              value={`${campaignMetrics.ctr.toFixed(2)}%`}
              icon="📈"
              trend="neutral"
            />
            <KpiCard 
              title="CVR" 
              value={`${campaignMetrics.cvr.toFixed(2)}%`}
              icon="🔄"
              trend="neutral"
            />
            <KpiCard 
              title="Avg CPC" 
              value={`$${campaignMetrics.avg_cpc.toFixed(2)}`}
              icon="💵"
              trend="neutral"
            />
            <KpiCard 
              title="Budget Remaining" 
              value={`$${campaignMetrics.remaining_budget.toFixed(2)}`}
              icon="💰"
              trend={campaignMetrics.remaining_budget > selectedCampaign.total_budget * 0.2 ? 'up' : 'down'}
            />
          </div>
        )}

        {/* Performance Banner - Only show for optimized campaigns with baseline comparison */}
        {selectedCampaign.strategy === 'optimized' && baselineMetrics && (
          <div className="mb-12">
            <PerformanceBanner improvement={improvement} />
          </div>
        )}

        {/* Comparison KPIs - Only for optimized campaigns */}
        {kpiData && selectedCampaign.strategy === 'optimized' && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">📊 vs Baseline Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <KpiCard 
                title="Click Difference" 
                value={kpiData.clickDifference > 0 ? `+${kpiData.clickDifference.toLocaleString()}` : kpiData.clickDifference.toLocaleString()}
                icon="👆"
                trend={kpiData.clickDifference > 0 ? 'up' : kpiData.clickDifference < 0 ? 'down' : 'neutral'}
              />
              <KpiCard 
                title="Conversion Difference" 
                value={kpiData.conversionDifference > 0 ? `+${kpiData.conversionDifference.toLocaleString()}` : kpiData.conversionDifference.toLocaleString()}
                icon="🎯"
                trend={kpiData.conversionDifference > 0 ? 'up' : kpiData.conversionDifference < 0 ? 'down' : 'neutral'}
              />
              <KpiCard 
                title="Score Difference" 
                value={kpiData.scoreDifference > 0 ? `+${kpiData.scoreDifference.toLocaleString()}` : kpiData.scoreDifference.toLocaleString()}
                icon="📊"
                trend={kpiData.scoreDifference > 0 ? 'up' : kpiData.scoreDifference < 0 ? 'down' : 'neutral'}
              />
              <KpiCard 
                title="Budget Efficiency" 
                value={`${kpiData.budgetEfficiency.toFixed(1)}%`}
                icon="💰"
                trend={kpiData.budgetEfficiency < 100 ? 'up' : 'down'}
              />
            </div>
          </div>
        )}

        {/* Dataset Insights (EDA) */}
        {eda && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border-2 border-blue-500/40 rounded-3xl p-10 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 tracking-tight">
                📊 Dataset Insights (EDA)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <p className="text-cyan-300 text-sm mb-2 uppercase tracking-wide">Total Rows</p>
                  <p className="text-3xl font-extrabold text-white">{eda.total_rows.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-cyan-300 text-sm mb-2 uppercase tracking-wide">Total Clicks</p>
                  <p className="text-3xl font-extrabold text-white">{eda.total_clicks.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-cyan-300 text-sm mb-2 uppercase tracking-wide">Total Conversions</p>
                  <p className="text-3xl font-extrabold text-white">{eda.total_conversions.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-cyan-300 text-sm mb-2 uppercase tracking-wide">Average Market Price</p>
                  <p className="text-3xl font-extrabold text-white">${eda.avg_market_price}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <p className="text-cyan-300 text-sm mb-2 uppercase tracking-wide">CTR</p>
                  <p className="text-3xl font-extrabold text-white">{(eda.ctr * 100).toFixed(2)}%</p>
                </div>
                <div className="text-center">
                  <p className="text-cyan-300 text-sm mb-2 uppercase tracking-wide">CVR</p>
                  <p className="text-3xl font-extrabold text-white">{(eda.cvr * 100).toFixed(2)}%</p>
                </div>
                <div className="text-center">
                  <p className="text-cyan-300 text-sm mb-2 uppercase tracking-wide">Device Distribution</p>
                  <div className="text-white">
                    {Object.entries(eda.device_distribution).map(([device, percentage]) => (
                      <div key={device} className="text-base font-semibold">
                        Device {device}: {(percentage * 100).toFixed(1)}%
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <EdaCharts 
                totalClicks={eda.total_clicks}
                totalConversions={eda.total_conversions}
                deviceDistribution={eda.device_distribution}
              />
            </div>
          </div>
        )}

        {/* Charts Section - Only for optimized campaigns with comparison */}
        {selectedCampaign.strategy === 'optimized' && chartData.length > 0 && (
          <div className="mb-12">
            <ChartsSection chartData={chartData} budgetData={budgetData} />
          </div>
        )}

        {/* Advanced ML Analytics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">🤖 Advanced ML Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <HourlyTrendChart data={hourly} />
            <MarketPriceHistogram data={histogram} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FeatureImportanceChart data={featureImportance} />
            {confidence && <ModelConfidenceCard data={confidence} />}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500">
          <p>🚀 AI-powered Real-Time Bidding Optimization Engine</p>
        </div>
      </div>
    </div>
  )
}