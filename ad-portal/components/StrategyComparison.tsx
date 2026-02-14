"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import GlassCard from "./GlassCard";
import { SimulationResult } from "@/types/rtb";

interface StrategyComparisonProps {
  baseline: SimulationResult;
  optimized: SimulationResult;
}

export default function StrategyComparison({ baseline, optimized }: StrategyComparisonProps) {
  const comparisonData = [
    {
      metric: "Clicks",
      Baseline: baseline.metrics.totalClicks,
      Optimized: optimized.metrics.totalClicks,
    },
    {
      metric: "Conversions",
      Baseline: baseline.metrics.totalConversions,
      Optimized: optimized.metrics.totalConversions,
    },
    {
      metric: "Score",
      Baseline: baseline.metrics.score,
      Optimized: optimized.metrics.score,
    },
  ];

  return (
    <GlassCard>
      <h3 className="text-lg font-semibold text-white mb-6">Strategy Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="metric" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              backdropFilter: "blur(12px)",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend wrapperStyle={{ color: "#9ca3af" }} />
          <Bar dataKey="Baseline" fill="#6366f1" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Optimized" fill="#22d3ee" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
