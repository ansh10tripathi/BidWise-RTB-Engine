export interface RTBMetrics {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalSpent: number;
  remainingBudget: number;
  ctr: number;
  cvr: number;
  score: number;
  avgCPC: number;
}

export interface CampaignPerformance {
  campaignId: number;
  impressions: number;
  clicks: number;
  conversions: number;
  spent: number;
  ctr: number;
  cvr: number;
  score: number;
}

export interface HourlyPerformance {
  hour: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
}

export interface SimulationResult {
  strategy: string;
  metrics: RTBMetrics;
  campaignPerformance: CampaignPerformance[];
  hourlyPerformance: HourlyPerformance[];
}
