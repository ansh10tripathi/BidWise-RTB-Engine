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
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    green: "text-green-400",
    blue: "text-blue-400",
    orange: "text-orange-400",
    pink: "text-pink-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-md p-6 transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs uppercase text-slate-400 tracking-wider mb-2">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight text-white mb-1">{value}</h3>
          {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-sm font-medium ${trend.isPositive ? "text-emerald-400" : "text-red-400"}`}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value).toFixed(1)}%
              </span>
              <span className="text-slate-500 text-xs">vs baseline</span>
            </div>
          )}
        </div>
        <div className={`${colorMap[color]} w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
