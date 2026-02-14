"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Slider from "@/components/ui/Slider";
import MultiSelect from "@/components/ui/MultiSelect";
import Button from "@/components/ui/Button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { CreateCampaignRequest } from "@/types/campaign";
import { apiClient } from "@/lib/api/client";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CreateCampaignRequest>({
    campaignName: "",
    totalBudget: 10000,
    baseBid: 5,
    strategy: "optimized",
    conversionWeight: 10,
    deviceTargeting: "all",
    activeHours: Array.from({ length: 24 }, (_, i) => i),
  });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.campaignName.trim()) {
      newErrors.campaignName = "Campaign name is required";
    }
    if (formData.totalBudget <= 0) {
      newErrors.totalBudget = "Budget must be greater than 0";
    }
    if (formData.baseBid <= 0) {
      newErrors.baseBid = "Base bid must be greater than 0";
    }
    if (formData.activeHours.length === 0) {
      newErrors.activeHours = "Select at least one active hour";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const campaign = await apiClient.createCampaign(formData);
      console.log("Campaign created:", campaign);
      router.push("/campaigns");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please ensure the backend is running on http://localhost:8000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Create Campaign</h1>
          <p className="text-gray-400">Set up a new advertising campaign</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-cyan-500" />
            <h2 className="text-lg font-semibold text-white">Basic Information</h2>
          </div>

          <div className="space-y-4">
            <Input
              label="Campaign Name"
              placeholder="e.g., Summer Sale 2024"
              value={formData.campaignName}
              onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
              error={errors.campaignName}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Total Budget ($)"
                type="number"
                placeholder="10000"
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: Number(e.target.value) })}
                error={errors.totalBudget}
              />

              <Input
                label="Base Bid ($)"
                type="number"
                step="0.01"
                placeholder="5.00"
                value={formData.baseBid}
                onChange={(e) => setFormData({ ...formData, baseBid: Number(e.target.value) })}
                error={errors.baseBid}
              />
            </div>
          </div>
        </Card>

        {/* Strategy & Optimization */}
        <Card>
          <h2 className="text-lg font-semibold text-white mb-6">Strategy & Optimization</h2>

          <div className="space-y-6">
            <Select
              label="Bidding Strategy"
              value={formData.strategy}
              onChange={(e) =>
                setFormData({ ...formData, strategy: e.target.value as "baseline" | "optimized" })
              }
              options={[
                { value: "baseline", label: "Baseline - Fixed Bidding" },
                { value: "optimized", label: "Optimized - ML-Powered Bidding" },
              ]}
            />

            <Slider
              label="Conversion Weight (N)"
              value={formData.conversionWeight}
              min={1}
              max={20}
              step={1}
              onChange={(e) => setFormData({ ...formData, conversionWeight: Number(e.target.value) })}
            />
            <p className="text-xs text-gray-500 -mt-4">
              Score = Clicks + N × Conversions
            </p>
          </div>
        </Card>

        {/* Targeting */}
        <Card>
          <h2 className="text-lg font-semibold text-white mb-6">Targeting</h2>

          <div className="space-y-6">
            <Select
              label="Device Targeting"
              value={formData.deviceTargeting}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deviceTargeting: e.target.value as "mobile" | "desktop" | "all",
                })
              }
              options={[
                { value: "all", label: "All Devices" },
                { value: "mobile", label: "Mobile Only" },
                { value: "desktop", label: "Desktop Only" },
              ]}
            />

            <MultiSelect
              label="Active Hours (0-23)"
              selected={formData.activeHours}
              onChange={(hours) => setFormData({ ...formData, activeHours: hours })}
              options={Array.from({ length: 24 }, (_, i) => i)}
            />
            {errors.activeHours && (
              <p className="text-sm text-red-400 -mt-4">{errors.activeHours}</p>
            )}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading} className="flex-1">
            {loading ? "Creating..." : "Create Campaign"}
          </Button>
        </div>
      </form>
    </div>
  );
}
