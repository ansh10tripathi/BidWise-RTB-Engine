"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Card from "@/components/ui/Card";

interface BudgetUsagePieChartProps {
  spent: number;
  remaining: number;
  title?: string;
}

export default function BudgetUsagePieChart({ spent, remaining, title = "Budget Usage" }: BudgetUsagePieChartProps) {
  const total = spent + remaining;
  const percentUsed = ((spent / total) * 100).toFixed(1);

  const data = [
    { name: "Spent", value: spent },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#22d3ee", "#374151"];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
              }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{percentUsed}%</p>
            <p className="text-sm text-gray-400">Used</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
          <span className="text-sm text-gray-300">Spent: ${spent.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
          <span className="text-sm text-gray-300">Remaining: ${remaining.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
}
