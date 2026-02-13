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
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Model Confidence</h3>
      
      <div className="space-y-6">
        {/* CTR Confidence */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">CTR Model</span>
            <span className="text-blue-400 font-bold">{ctrPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${data.avg_ctr_confidence * 100}%` }}
            />
          </div>
        </div>

        {/* CVR Confidence */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">CVR Model</span>
            <span className="text-green-400 font-bold">{cvrPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${data.avg_cvr_confidence * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}