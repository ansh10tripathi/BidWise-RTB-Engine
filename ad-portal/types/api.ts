import { CreateCampaignRequest, Campaign } from "./campaign";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface MetricsResponse {
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spent: number;
  remaining_budget: number;
  ctr: number;
  cvr: number;
  score: number;
  avg_cpc: number;
}

export interface AnalyticsResponse {
  hourly_performance: {
    hour: number;
    clicks: number;
    conversions: number;
    ctr: number;
  }[];
  device_performance: {
    mobile: { clicks: number; conversions: number; ctr: number; cvr: number };
    desktop: { clicks: number; conversions: number; ctr: number; cvr: number };
  };
  feature_importance: {
    feature: string;
    importance: number;
  }[];
}

export interface SimulationRequest {
  campaignId: string;
  strategy: "baseline" | "optimized";
}

export interface SimulationResponse {
  strategy: string;
  metrics: MetricsResponse;
  timestamp: string;
}
