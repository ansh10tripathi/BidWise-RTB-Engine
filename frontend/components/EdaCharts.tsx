// @ts-nocheck
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface EdaChartsProps {
  totalClicks: number
  totalConversions: number
  deviceDistribution: { [key: string]: number }
}

const COLORS = ['#3b82f6', '#06b6d4']
const PIE_COLORS = ['#8b5cf6', '#f59e0b']

export default function EdaCharts({ totalClicks, totalConversions, deviceDistribution }: EdaChartsProps) {
  const barData = [
    { name: 'Clicks', value: totalClicks },
    { name: 'Conversions', value: totalConversions }
  ]

  const pieData = Object.entries(deviceDistribution).map(([device, percentage]) => ({
    name: `Device ${device}`,
    value: percentage * 100
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Bar Chart */}
      <div className="bg-slate-800/30 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Clicks vs Conversions</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-slate-800/30 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Device Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}