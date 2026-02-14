import Card from "@/components/ui/Card";
import { Brain, TrendingUp, Zap, DollarSign } from "lucide-react";

interface AdvancedMetricsProps {
  modelConfidence: number;
  roi: number;
  burnRate: number;
  daysRemaining: number;
}

export default function AdvancedMetrics({ modelConfidence, roi, burnRate, daysRemaining }: AdvancedMetricsProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">Advanced Analytics</h3>
      <div className="space-y-4">
        {/* Model Confidence */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Brain className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Model Confidence</p>
              <p className="text-lg font-bold text-white">{modelConfidence}%</p>
            </div>
          </div>
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
              style={{ width: `${modelConfidence}%` }}
            />
          </div>
        </div>

        {/* ROI */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">ROI Estimate</p>
              <p className="text-lg font-bold text-green-500">{roi}%</p>
            </div>
          </div>
        </div>

        {/* Burn Rate */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Budget Burn Rate</p>
              <p className="text-lg font-bold text-white">${burnRate}/day</p>
            </div>
          </div>
        </div>

        {/* Days Remaining */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Days Remaining</p>
              <p className="text-lg font-bold text-white">{daysRemaining} days</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
