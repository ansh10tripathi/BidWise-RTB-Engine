import { RTBData } from '../types'

interface StrategyCardProps {
  title: string
  data: RTBData | null
  type: 'baseline' | 'optimized'
}

export default function StrategyCard({ title, data, type }: StrategyCardProps) {
  const isOptimized = type === 'optimized'
  const borderColor = isOptimized ? 'border-green-500/30' : 'border-red-500/30'
  const titleColor = isOptimized ? 'text-green-400' : 'text-red-400'
  const glowColor = isOptimized ? 'hover:shadow-green-500/10' : 'hover:shadow-red-500/10'

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border ${borderColor} p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${glowColor}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700/10 to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <h3 className={`text-xl font-bold ${titleColor} mb-6`}>{title}</h3>
        {data && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Clicks</span>
              <span className="font-bold text-white">{data.clicks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Conversions</span>
              <span className="font-bold text-white">{data.conversions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Score</span>
              <span className="font-bold text-xl text-white">{data.score.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Budget Remaining</span>
              <span className="font-bold text-white">${data.remaining_budget.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}