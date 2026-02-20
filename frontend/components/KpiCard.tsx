interface KpiCardProps {
  title: string
  value: string
  icon: string
  trend?: 'up' | 'down' | 'neutral'
}

export default function KpiCard({ title, value, icon, trend = 'neutral' }: KpiCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-emerald-400'
      case 'down': return 'text-red-400'
      default: return 'text-cyan-400'
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border border-white/20 p-8 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm uppercase tracking-wide font-medium mb-3">{title}</p>
          <p className={`text-4xl font-extrabold ${getTrendColor()} tracking-tight`}>{value}</p>
        </div>
        <div className="text-5xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
      </div>
    </div>
  )
}