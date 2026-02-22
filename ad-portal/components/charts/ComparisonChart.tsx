"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Card from "@/components/ui/Card";

interface ComparisonChartProps {
  title: string;
  data: { metric: string; Baseline: number; Optimized: number }[];
}

export default function ComparisonChart({ title, data }: ComparisonChartProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="metric" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="Baseline" fill="#6366f1" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Optimized" fill="#22d3ee" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
