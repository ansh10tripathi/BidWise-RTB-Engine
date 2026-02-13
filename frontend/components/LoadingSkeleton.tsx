export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="h-10 bg-slate-700 rounded-lg w-80 animate-pulse mb-2" />
            <div className="h-6 bg-slate-700 rounded-lg w-60 animate-pulse" />
          </div>
          <div className="h-12 w-12 bg-slate-700 rounded-lg animate-pulse" />
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-4 bg-slate-600 rounded w-20 animate-pulse mb-2" />
                  <div className="h-8 bg-slate-600 rounded w-16 animate-pulse" />
                </div>
                <div className="h-8 w-8 bg-slate-600 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Performance Banner Skeleton */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="h-8 bg-slate-600 rounded w-48 animate-pulse mb-2" />
              <div className="h-5 bg-slate-600 rounded w-64 animate-pulse" />
            </div>
            <div className="h-12 bg-slate-600 rounded w-24 animate-pulse" />
          </div>
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <div className="h-6 bg-slate-600 rounded w-40 animate-pulse mb-6" />
              <div className="h-64 bg-slate-600 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Strategy Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <div className="h-6 bg-slate-600 rounded w-32 animate-pulse mb-6" />
              <div className="space-y-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="flex justify-between">
                    <div className="h-4 bg-slate-600 rounded w-20 animate-pulse" />
                    <div className="h-4 bg-slate-600 rounded w-16 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}