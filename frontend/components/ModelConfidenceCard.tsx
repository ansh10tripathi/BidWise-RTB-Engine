interface ConfidenceData {
  avg_ctr_confidence: number
  avg_cvr_confidence: number
}

interface ModelConfidenceCardProps {
  data: ConfidenceData
}

export default function ModelConfidenceCard({ data }: ModelConfidenceCardProps) {
  const ctrPercentage = (data.avg_ctr_confidence * 100).toFixed(1)
  const cvrPercentage = (data.avg_cvr_confidence * 100).toFixed(1)

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Model Confidence</h3>
      
      <div className="space-y-8">
        {/* CTR Confidence */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300 text-sm uppercase tracking-wide">CTR Model</span>
            <span className="text-cyan-400 font-extrabold text-xl">{ctrPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-4 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${ctrPercentage}%` }}
            />
          </div>
        </div>

        {/* CVR Confidence */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300 text-sm uppercase tracking-wide">CVR Model</span>
            <span className="text-emerald-400 font-extrabold text-xl">{cvrPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-green-500 h-4 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${cvrPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}