"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { Campaign } from "@/types/campaign";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Trash2 } from "lucide-react";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      const data = await apiClient.getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (campaignId: string, campaignName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${campaignName}"?`)) {
      return;
    }

    setDeleting(campaignId);
    try {
      await apiClient.deleteCampaign(campaignId);
      setCampaigns(campaigns.filter((c) => c.id !== campaignId));
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      alert("Failed to delete campaign. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="text-white">Loading campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Campaigns</h1>
          <p className="text-gray-400">Manage your advertising campaigns</p>
        </div>

        <Link href="/campaigns/create">
          <Button>+ New Campaign</Button>
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <p className="text-gray-400">No campaigns yet</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} hover>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    {campaign.campaign_name}
                  </h2>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">
                      Budget: ${campaign.total_budget.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Strategy: <span className="text-cyan-400">{campaign.strategy}</span>
                    </p>
                    <p className="text-sm text-green-400">
                      Status: {campaign.status}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(campaign.id, campaign.campaign_name)}
                  disabled={deleting === campaign.id}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-all group disabled:opacity-50"
                  title="Delete campaign"
                >
                  <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
