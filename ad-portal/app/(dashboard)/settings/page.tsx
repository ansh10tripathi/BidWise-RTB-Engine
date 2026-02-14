import Card from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account settings</p>
      </div>

      <Card>
        <p className="text-gray-400">Settings options will appear here</p>
      </Card>
    </div>
  );
}
