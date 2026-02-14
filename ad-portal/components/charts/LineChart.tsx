"use client";

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface LineChartProps {
  data: any[];
  dataKeys: { key: string; color: string; name: string }[];
  xAxisKey: string;
  height?: number;
}

export default function LineChart({ data, dataKeys, xAxisKey, height = 300 }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey={xAxisKey} stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
        <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
          }}
        />
        <Legend />
        {dataKeys.map((dk) => (
          <Line key={dk.key} type="monotone" dataKey={dk.key} stroke={dk.color} strokeWidth={2} name={dk.name} />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
