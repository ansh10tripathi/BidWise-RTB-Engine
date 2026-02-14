"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Card from "@/components/ui/Card";

interface HourlyChartProps {
  title: string;
  data: any[];
}

export default function HourlyChart({ title, data }: HourlyChartProps) {
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
          />
          <Legend />
          <Line type="monotone" dataKey="clicks" stroke="#22d3ee" strokeWidth={2} name="Clicks" />
          <Line type="monotone" dataKey="conversions" stroke="#a855f7" strokeWidth={2} name="Conversions" />
          <Line type="monotone" dataKey="ctr" stroke="#10b981" strokeWidth={2} name="CTR %" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
