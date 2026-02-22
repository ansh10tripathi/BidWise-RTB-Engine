"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Slider from "@/components/ui/Slider";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    campaignName: "",
    totalBudget: 10000,
    baseBid: 50,
    conversionWeight: 10,
    strategy: "optimized",
    deviceTargeting: "all",
    activeHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("campaignName", formData.campaignName);
      formDataToSend.append("totalBudget", formData.totalBudget.toString());
      formDataToSend.append("baseBid", formData.baseBid.toString());
      formDataToSend.append("conversionWeight", formData.conversionWeight.toString());
      formDataToSend.append("strategy", formData.strategy);
      formDataToSend.append("deviceTargeting", formData.deviceTargeting);
      formDataToSend.append("activeHours", JSON.stringify(formData.activeHours));
      if (file) {
        formDataToSend.append("file", file);
      }
      
      const response = await fetch("http://localhost:8000/create-campaign", {
        method: "POST",
        body: formDataToSend
      });
      
      if (response.ok) {
        router.push("/dashboard");
      } else {
        const error = await response.json();
        console.error("Failed to create campaign:", error);
      }
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Create New Campaign</h1>
      
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Campaign Name
            </label>
            <Input
              value={formData.campaignName}
              onChange={(e) => setFormData({...formData, campaignName: e.target.value})}
              placeholder="Enter campaign name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Total Budget ($)
            </label>
            <Input
              type="number"
              value={formData.totalBudget}
              onChange={(e) => setFormData({...formData, totalBudget: Number(e.target.value)})}
              min="1000"
              max="100000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Base Bid ($)
            </label>
            <Input
              type="number"
              value={formData.baseBid}
              onChange={(e) => setFormData({...formData, baseBid: Number(e.target.value)})}
              min="1"
              max="500"
              required
            />
          </div>

          <div>
            <Slider
              label="Conversion Weight"
              value={formData.conversionWeight}
              onChange={(e) => setFormData({...formData, conversionWeight: Number(e.target.value)})}
              min={1}
              max={20}
              step={1}
            />
            <div className="text-sm text-slate-400 mt-1">
              Current: {formData.conversionWeight}x
            </div>
          </div>

          <div>
            <Select
              label="Strategy"
              value={formData.strategy}
              onChange={(e) => setFormData({...formData, strategy: e.target.value})}
              options={[
                { value: "optimized", label: "Optimized" },
                { value: "baseline", label: "Baseline" }
              ]}
            />
          </div>

          <div>
            <Select
              label="Device Targeting"
              value={formData.deviceTargeting}
              onChange={(e) => setFormData({...formData, deviceTargeting: e.target.value})}
              options={[
                { value: "all", label: "All Devices" },
                { value: "mobile", label: "Mobile Only" },
                { value: "desktop", label: "Desktop Only" }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Active Hours
            </label>
            <div className="text-sm text-slate-400 mb-2">
              Campaign will run 24/7 (all hours selected by default)
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <button
                  key={hour}
                  type="button"
                  onClick={() => {
                    const newHours = formData.activeHours.includes(hour)
                      ? formData.activeHours.filter(h => h !== hour)
                      : [...formData.activeHours, hour].sort((a, b) => a - b);
                    setFormData({...formData, activeHours: newHours});
                  }}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    formData.activeHours.includes(hour)
                      ? "bg-cyan-500 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {hour}:00
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Custom Dataset (Optional)
            </label>
            <input
              type="file"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 transition-colors"
            />
            {file && (
              <div className="text-sm text-cyan-400 mt-2">
                Selected: {file.name}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Create Campaign
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
