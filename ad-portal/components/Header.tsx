import { TrendingUp, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-cyan/10 rounded-lg">
              <Zap className="w-6 h-6 text-accent-cyan" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BidWise RTB</h1>
              <p className="text-xs text-gray-400">Real-Time Bidding Optimization</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
