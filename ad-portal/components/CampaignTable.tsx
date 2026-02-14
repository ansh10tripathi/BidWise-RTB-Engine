import { CampaignPerformance } from "@/types/rtb";
import GlassCard from "./GlassCard";

interface CampaignTableProps {
  campaigns: CampaignPerformance[];
  title: string;
}

export default function CampaignTable({ campaigns, title }: CampaignTableProps) {
  return (
    <GlassCard>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Campaign</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Impressions</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Clicks</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Conversions</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">CTR</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">CVR</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Score</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.campaignId}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-3 px-4 text-sm text-white font-medium">
                  Campaign {campaign.campaignId}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-right">
                  {campaign.impressions.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-right">
                  {campaign.clicks.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-right">
                  {campaign.conversions}
                </td>
                <td className="py-3 px-4 text-sm text-accent-cyan text-right">
                  {campaign.ctr.toFixed(2)}%
                </td>
                <td className="py-3 px-4 text-sm text-accent-cyan text-right">
                  {campaign.cvr.toFixed(2)}%
                </td>
                <td className="py-3 px-4 text-sm text-white font-semibold text-right">
                  {campaign.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
