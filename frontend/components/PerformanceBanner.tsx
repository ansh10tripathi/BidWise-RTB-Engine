interface PerformanceBannerProps {
  improvement: number
}

export default function PerformanceBanner({ improvement }: PerformanceBannerProps) {
  const isPositive = improvement > 0
  const bgColor = isPositive ? 'from-green-600/20 to-emerald-600/20' : 'from-red-600/20 to-rose-600/20'
  const borderColor = isPositive ? 'border-green-500/30' : 'border-red-500/30'
  const textColor = isPositive ? 'text-green-400' : 'text-red-400'
  const iconColor = isPositive ? 'text-green-500' : 'text-red-500'
  const message = isPositive ? 'Score Increased' : 'Score Decreased'
  const icon = isPositive ? '📈' : '📉'

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${bgColor} backdrop-blur-xl border ${borderColor} p-8 hover:scale-105 transition-all duration-300`}>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/10 to-slate-900/10" />
      <div className="relative flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{message}</h2>
          <p className="text-slate-300">Performance vs Baseline Strategy</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{icon}</span>
            <div className={`text-4xl font-bold ${textColor}`}>
              {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}