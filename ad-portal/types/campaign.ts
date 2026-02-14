// Frontend request type (camelCase)
export interface CreateCampaignRequest {
  campaignName: string;
  totalBudget: number;
  baseBid: number;
  strategy: "baseline" | "optimized";
  conversionWeight: number;
  deviceTargeting: "mobile" | "desktop" | "all";
  activeHours: number[];
}

// Backend response type (snake_case)
export interface Campaign {
  id: string;
  campaign_name: string;
  total_budget: number;
  base_bid: number;
  strategy: string;
  conversion_weight: number;
  device_targeting: string;
  active_hours: number[];
  status: string;
  created_at: string;
}
