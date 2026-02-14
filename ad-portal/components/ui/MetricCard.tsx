import { LucideIcon } from "lucide-react";
import Card from "./Card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export default function MetricCard({ title, value, subtitle, icon: Icon, trend, color = "cyan" }: MetricCardProps) {
  const colorMap: Record<string, string> = {
    cyan: "bg-cyan-500/10 text-cyan-500",
    purple: "bg-purple-500/10 text-purple-500",
    green: "bg-green-500/10 text-green-500",
    blue: "bg-blue-500/10 text-blue-500",
    orange: "bg-orange-500/10 text-orange-500",
    pink: "bg-pink-500/10 text-pink-500",
  };

  return (
    <Card hover className="group shadow-lg shadow-black/10 animate-in fade-in duration-500">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-3">
              <span className={`text-xs font-semibold ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500">vs baseline</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg group-hover:scale-110 transition-all duration-300 shadow-md ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
