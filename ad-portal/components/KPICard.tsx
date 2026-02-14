import { LucideIcon } from "lucide-react";
import GlassCard from "./GlassCard";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function KPICard({ title, value, subtitle, icon: Icon, trend }: KPICardProps) {
  return (
    <GlassCard hover className="group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-medium ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">vs baseline</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-accent-cyan/10 rounded-lg group-hover:bg-accent-cyan/20 transition-colors">
          <Icon className="w-6 h-6 text-accent-cyan" />
        </div>
      </div>
    </GlassCard>
  );
}
