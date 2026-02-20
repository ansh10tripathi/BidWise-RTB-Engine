interface PerformanceBannerProps {
  improvement: number
}

export default function PerformanceBanner({ improvement }: PerformanceBannerProps) {

  const isPositive = improvement > 0
  const isNegative = improvement < 0

  return (
    <div
      className={`rounded-2xl border backdrop-blur-xl p-8 flex justify-between items-center transition-all duration-300
        ${
          isPositive
            ? "border-emerald-500/40 bg-emerald-500/5"
            : isNegative
            ? "border-rose-500/40 bg-rose-500/5"
            : "border-slate-600/40 bg-slate-800/40"
        }
      `}
    >
      
      {/* Left Side */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          {isPositive
            ? "Score Increased"
            : isNegative
            ? "Score Decreased"
            : "No Change"}
        </h2>

        <p className="text-slate-400 mt-1">
          Performance vs Baseline Strategy
        </p>
      </div>

      {/* Right Side */}
      <div
        className={`text-4xl md:text-5xl font-extrabold transition-all duration-300
          ${
            isPositive
              ? "text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]"
              : isNegative
              ? "text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]"
              : "text-slate-400"
          }
        `}
      >
        {isPositive && "+"}
        {improvement.toFixed(1)}%
      </div>
    </div>
  )
}
