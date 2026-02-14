"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import Card from "@/components/ui/Card";

interface BudgetPieChartProps {
  title: string;
  spent: number;
  remaining: number;
}

export default function BudgetPieChart({ title, spent, remaining }: BudgetPieChartProps) {
  const data = [
    { name: "Spent", value: spent },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#22d3ee", "#374151"];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
