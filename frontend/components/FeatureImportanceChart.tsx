// @ts-nocheck
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface FeatureData {
  feature: string
  importance: number
}

interface FeatureImportanceChartProps {
  data: FeatureData[]
}

export default function FeatureImportanceChart({ data }: FeatureImportanceChartProps) {
  const topFeatures = data.slice(0, 5)

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Feature Importance (Top 5)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topFeatures} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis type="number" stroke="#9ca3af" />
          <YAxis dataKey="feature" type="category" stroke="#9ca3af" width={80} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }} 
          />
          <Bar dataKey="importance" fill="#f59e0b" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}