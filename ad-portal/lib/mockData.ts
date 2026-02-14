import { SimulationResult, RTBMetrics, CampaignPerformance, HourlyPerformance } from "@/types/rtb";

export const mockBaselineData: SimulationResult = {
  strategy: "Baseline",
  metrics: {
    totalImpressions: 45230,
    totalClicks: 1245,
    totalConversions: 89,
    totalSpent: 9850.50,
    remainingBudget: 150.50,
    ctr: 2.75,
    cvr: 7.15,
    score: 1334,
    avgCPC: 7.91,
  },
  campaignPerformance: [
    { campaignId: 1, impressions: 8920, clicks: 198, conversions: 12, spent: 1850.20, ctr: 2.22, cvr: 6.06, score: 210 },
    { campaignId: 2, impressions: 9450, clicks: 285, conversions: 22, spent: 2150.80, ctr: 3.02, cvr: 7.72, score: 307 },
    { campaignId: 3, impressions: 10120, clicks: 312, conversions: 28, spent: 2450.30, ctr: 3.08, cvr: 8.97, score: 340 },
    { campaignId: 4, impressions: 8340, clicks: 225, conversions: 15, spent: 1850.10, ctr: 2.70, cvr: 6.67, score: 240 },
    { campaignId: 5, impressions: 8400, clicks: 225, conversions: 12, spent: 1549.10, ctr: 2.68, cvr: 5.33, score: 237 },
  ],
  hourlyPerformance: [
    { hour: 0, impressions: 1520, clicks: 35, conversions: 2, ctr: 2.30 },
    { hour: 1, impressions: 1380, clicks: 28, conversions: 1, ctr: 2.03 },
    { hour: 2, impressions: 1250, clicks: 22, conversions: 1, ctr: 1.76 },
    { hour: 6, impressions: 1680, clicks: 42, conversions: 3, ctr: 2.50 },
    { hour: 10, impressions: 2150, clicks: 58, conversions: 5, ctr: 2.70 },
    { hour: 14, impressions: 2380, clicks: 68, conversions: 6, ctr: 2.86 },
    { hour: 18, impressions: 2850, clicks: 98, conversions: 9, ctr: 3.44 },
    { hour: 20, impressions: 3120, clicks: 112, conversions: 11, ctr: 3.59 },
    { hour: 22, impressions: 2920, clicks: 105, conversions: 8, ctr: 3.60 },
  ],
};

export const mockOptimizedData: SimulationResult = {
  strategy: "Optimized",
  metrics: {
    totalImpressions: 38450,
    totalClicks: 1580,
    totalConversions: 142,
    totalSpent: 9920.80,
    remainingBudget: 79.20,
    ctr: 4.11,
    cvr: 8.99,
    score: 1722,
    avgCPC: 6.28,
  },
  campaignPerformance: [
    { campaignId: 1, impressions: 7120, clicks: 245, conversions: 22, spent: 1750.40, ctr: 3.44, cvr: 8.98, score: 267 },
    { campaignId: 2, impressions: 8250, clicks: 385, conversions: 35, spent: 2280.50, ctr: 4.67, cvr: 9.09, score: 420 },
    { campaignId: 3, impressions: 8920, clicks: 425, conversions: 42, spent: 2550.80, ctr: 4.77, cvr: 9.88, score: 467 },
    { campaignId: 4, impressions: 7080, clicks: 285, conversions: 24, spent: 1850.30, ctr: 4.03, cvr: 8.42, score: 309 },
    { campaignId: 5, impressions: 7080, clicks: 240, conversions: 19, spent: 1488.80, ctr: 3.39, cvr: 7.92, score: 259 },
  ],
  hourlyPerformance: [
    { hour: 0, impressions: 1280, clicks: 42, conversions: 3, ctr: 3.28 },
    { hour: 1, impressions: 1150, clicks: 35, conversions: 2, ctr: 3.04 },
    { hour: 2, impressions: 1050, clicks: 28, conversions: 2, ctr: 2.67 },
    { hour: 6, impressions: 1450, clicks: 55, conversions: 5, ctr: 3.79 },
    { hour: 10, impressions: 1850, clicks: 78, conversions: 8, ctr: 4.22 },
    { hour: 14, impressions: 2080, clicks: 92, conversions: 10, ctr: 4.42 },
    { hour: 18, impressions: 2520, clicks: 128, conversions: 15, ctr: 5.08 },
    { hour: 20, impressions: 2780, clicks: 148, conversions: 18, ctr: 5.32 },
    { hour: 22, impressions: 2650, clicks: 138, conversions: 14, ctr: 5.21 },
  ],
};
