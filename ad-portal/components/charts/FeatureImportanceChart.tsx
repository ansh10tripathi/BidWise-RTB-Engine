"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "@/components/ui/Card";

interface FeatureData {
  feature: string;
  importance: number;
}

interface FeatureImportanceChartProps {
  data: FeatureData[];
  title?: string;
}

export default function FeatureImportanceChart({ data, title = "Feature Importance" }: FeatureImportanceChartProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis type="number" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
          <YAxis dataKey="feature" type="category" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} width={100} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
            }}
            formatter={(value: number) => value.toFixed(2)}
          />
          <Bar 
            dataKey="importance" 
            fill="#22d3ee" 
            radius={[0, 8, 8, 0]} 
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
