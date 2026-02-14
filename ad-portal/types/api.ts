import { CreateCampaignRequest, Campaign } from "./campaign";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface MetricsResponse {
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

export interface AnalyticsResponse {
  hourlyPerformance: {
    hour: number;
    clicks: number;
    conversions: number;
    ctr: number;
  }[];
  devicePerformance: {
    mobile: { clicks: number; conversions: number; ctr: number; cvr: number };
    desktop: { clicks: number; conversions: number; ctr: number; cvr: number };
  };
  featureImportance: {
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
