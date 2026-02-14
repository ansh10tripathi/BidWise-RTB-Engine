import Card from "@/components/ui/Card";

interface HeatmapData {
  hour: number;
  value: number;
  label: string;
}

interface HourlyHeatmapProps {
  data: HeatmapData[];
  title?: string;
}

export default function HourlyHeatmap({ data, title = "Hourly Performance Heatmap" }: HourlyHeatmapProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  const getColor = (value: number) => {
    const intensity = value / maxValue;
    if (intensity > 0.75) return "bg-cyan-500";
    if (intensity > 0.5) return "bg-cyan-600";
    if (intensity > 0.25) return "bg-cyan-700";
    return "bg-cyan-900";
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <div className="grid grid-cols-6 gap-2">
        {data.map((item) => (
          <div
            key={item.hour}
            className={`relative group ${getColor(item.value)} rounded-lg p-3 transition-all hover:scale-105 cursor-pointer`}
          >
            <div className="text-center">
              <p className="text-xs text-white/70 mb-1">{item.hour}:00</p>
              <p className="text-sm font-bold text-white">{item.value}</p>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>Low Activity</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-cyan-900 rounded"></div>
          <div className="w-4 h-4 bg-cyan-700 rounded"></div>
          <div className="w-4 h-4 bg-cyan-600 rounded"></div>
          <div className="w-4 h-4 bg-cyan-500 rounded"></div>
        </div>
        <span>High Activity</span>
      </div>
    </Card>
  );
}
