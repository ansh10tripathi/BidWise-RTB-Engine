"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import GlassCard from "./GlassCard";

interface PerformanceChartProps {
  data: any[];
  title: string;
  dataKeys: { key: string; color: string; name: string }[];
  xAxisKey: string;
}

export default function PerformanceChart({ data, title, dataKeys, xAxisKey }: PerformanceChartProps) {
  return (
    <GlassCard>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#9ca3af" 
            tick={{ fill: "#9ca3af" }}
          />
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
          {dataKeys.map((dk) => (
            <Line
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              stroke={dk.color}
              strokeWidth={2}
              name={dk.name}
              dot={{ fill: dk.color, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
