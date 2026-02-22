import Card from "@/components/ui/Card";
import { Smartphone, Monitor } from "lucide-react";

interface DeviceStats {
  clicks?: number;
  conversions?: number;
  ctr?: number;
  cvr?: number;
}

interface DevicePerformanceProps {
  mobile?: DeviceStats;
  desktop?: DeviceStats;
}

export default function DevicePerformance({ mobile, desktop }: DevicePerformanceProps) {

  const safeMobile = mobile ?? { clicks: 0, conversions: 0, ctr: 0, cvr: 0 };
  const safeDesktop = desktop ?? { clicks: 0, conversions: 0, ctr: 0, cvr: 0 };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">Device Performance</h3>

      <div className="space-y-4">

        {/* Mobile */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Smartphone className="w-5 h-5 text-cyan-500" />
            </div>
            <h4 className="font-semibold text-white">Mobile</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Clicks</p>
              <p className="text-lg font-bold text-white">
                {safeMobile.clicks?.toLocaleString() ?? 0}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Conversions</p>
              <p className="text-lg font-bold text-white">
                {safeMobile.conversions ?? 0}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">CTR</p>
              <p className="text-lg font-bold text-cyan-500">
                {safeMobile.ctr?.toFixed(2) ?? "0.00"}%
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">CVR</p>
              <p className="text-lg font-bold text-purple-500">
                {safeMobile.cvr?.toFixed(2) ?? "0.00"}%
              </p>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Monitor className="w-5 h-5 text-blue-500" />
            </div>
            <h4 className="font-semibold text-white">Desktop</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Clicks</p>
              <p className="text-lg font-bold text-white">
                {safeDesktop.clicks?.toLocaleString() ?? 0}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Conversions</p>
              <p className="text-lg font-bold text-white">
                {safeDesktop.conversions ?? 0}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">CTR</p>
              <p className="text-lg font-bold text-cyan-500">
                {safeDesktop.ctr?.toFixed(2) ?? "0.00"}%
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">CVR</p>
              <p className="text-lg font-bold text-purple-500">
                {safeDesktop.cvr?.toFixed(2) ?? "0.00"}%
              </p>
            </div>
          </div>
        </div>

      </div>
    </Card>
  );
}