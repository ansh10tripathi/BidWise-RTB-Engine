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

export default function Dashboard() {
  const [baseline, setBaseline] = useState<RTBData | null>(null)
  const [optimized, setOptimized] = useState<RTBData | null>(null)
  const [eda, setEda] = useState<EDAData | null>(null)
  const [hourly, setHourly] = useState<HourlyData[]>([])
  const [histogram, setHistogram] = useState<HistogramData[]>([])
  const [featureImportance, setFeatureImportance] = useState<FeatureData[]>([])
  const [confidence, setConfidence] = useState<ConfidenceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected'>('disconnected')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [baselineRes, optimizedRes, edaRes, hourlyRes, histogramRes, featureRes, confidenceRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/baseline'),
          fetch('http://127.0.0.1:8000/optimized'),
          fetch('http://127.0.0.1:8000/eda'),
          fetch('http://127.0.0.1:8000/analytics/hourly'),
          fetch('http://127.0.0.1:8000/analytics/market-price'),
          fetch('http://127.0.0.1:8000/analytics/feature-importance'),
          fetch('http://127.0.0.1:8000/analytics/confidence')
        ])
        
        if (!baselineRes.ok || !optimizedRes.ok || !edaRes.ok) {
          throw new Error('API request failed')
        }
        
        setBaseline(await baselineRes.json())
        setOptimized(await optimizedRes.json())
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
  }, [])

  // Calculate KPIs
  const kpiData: KPIData | null = baseline && optimized ? {
    clickDifference: optimized.clicks - baseline.clicks,
    conversionDifference: optimized.conversions - baseline.conversions,
    scoreDifference: optimized.score - baseline.score,
    budgetEfficiency: ((100000 - optimized.remaining_budget) / (100000 - baseline.remaining_budget)) * 100
  } : null

  const improvement = baseline && optimized 
    ? ((optimized.score - baseline.score) / baseline.score) * 100 
    : 0

  const chartData: ChartData[] = baseline && optimized ? [
    { name: 'Baseline', clicks: baseline.clicks, score: baseline.score },
    { name: 'Optimized', clicks: optimized.clicks, score: optimized.score }
  ] : []

  const budgetData: BudgetData[] = optimized ? [
    { name: 'Used', value: 100000 - optimized.remaining_budget },
    { name: 'Remaining', value: optimized.remaining_budget }
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

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">BidWise RTB Engine</h1>
            <p className="text-slate-400">Enterprise Analytics Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
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

        {/* KPI Cards */}
        {kpiData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              trend={kpiData.budgetEfficiency > 100 ? 'down' : 'up'}
            />
          </div>
        )}

        {/* Performance Banner */}
        <div className="mb-8">
          <PerformanceBanner improvement={improvement} />
        </div>

        {/* Dataset Insights (EDA) */}
        {eda && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                📊 Dataset Insights (EDA)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-blue-300 text-sm mb-1">Total Rows</p>
                  <p className="text-2xl font-bold text-white">{eda.total_rows.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-300 text-sm mb-1">Total Clicks</p>
                  <p className="text-2xl font-bold text-white">{eda.total_clicks.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-300 text-sm mb-1">Total Conversions</p>
                  <p className="text-2xl font-bold text-white">{eda.total_conversions.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-300 text-sm mb-1">Average Market Price</p>
                  <p className="text-2xl font-bold text-white">${eda.avg_market_price}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <p className="text-blue-300 text-sm mb-1">CTR</p>
                  <p className="text-2xl font-bold text-white">{(eda.ctr * 100).toFixed(2)}%</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-300 text-sm mb-1">CVR</p>
                  <p className="text-2xl font-bold text-white">{(eda.cvr * 100).toFixed(2)}%</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-300 text-sm mb-1">Device Distribution</p>
                  <div className="text-white">
                    {Object.entries(eda.device_distribution).map(([device, percentage]) => (
                      <div key={device} className="text-sm">
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

        {/* Charts Section */}
        <div className="mb-8">
          <ChartsSection chartData={chartData} budgetData={budgetData} />
        </div>

        {/* Advanced ML Analytics */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">🤖 Advanced ML Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <HourlyTrendChart data={hourly} />
            <MarketPriceHistogram data={histogram} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FeatureImportanceChart data={featureImportance} />
            {confidence && <ModelConfidenceCard data={confidence} />}
          </div>
        </div>

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <StrategyCard title="Baseline Strategy" data={baseline} type="baseline" />
          <StrategyCard title="Optimized Strategy" data={optimized} type="optimized" />
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500">
          <p>🚀 AI-powered Real-Time Bidding Optimization Engine</p>
        </div>
      </div>
    </div>
  )
}