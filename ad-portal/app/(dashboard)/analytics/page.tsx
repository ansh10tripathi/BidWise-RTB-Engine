import Card from "@/components/ui/Card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">View detailed performance metrics</p>
      </div>

      <Card>
        <p className="text-gray-400">Analytics data will appear here</p>
      </Card>
    </div>
  );
}
