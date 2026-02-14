"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Card from "@/components/ui/Card";

interface ClickComparisonData {
  hour: number;
  baseline: number;
  optimized: number;
}

interface ClickComparisonChartProps {
  title?: string;
  data: ClickComparisonData[];
}

export default function ClickComparisonChart({ title = "Click Comparison", data }: ClickComparisonChartProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="hour" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="baseline"
            stroke="#22d3ee"
            strokeWidth={2}
            name="Baseline"
            dot={{ fill: "#22d3ee", r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="optimized"
            stroke="#10b981"
            strokeWidth={2}
            name="Optimized"
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
