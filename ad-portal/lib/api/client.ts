import { CreateCampaignRequest, Campaign } from "@/types/campaign";
import {
  MetricsResponse,
  AnalyticsResponse,
  SimulationRequest,
  SimulationResponse,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", data);
        throw new Error(data?.detail || "API request failed");
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // ✅ CREATE CAMPAIGN
  async createCampaign(data: CreateCampaignRequest): Promise<Campaign> {
    return this.request<Campaign>("/create-campaign", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ✅ GET ALL CAMPAIGNS  ← THIS WAS MISSING
  async getCampaigns(): Promise<Campaign[]> {
    return this.request<Campaign[]>("/campaigns");
  }

  // ✅ GET SINGLE CAMPAIGN
  async getCampaign(campaignId: string): Promise<Campaign> {
    return this.request<Campaign>(`/campaigns/${campaignId}`);
  }

  // ✅ GET METRICS
  async getMetrics(campaignId: string): Promise<MetricsResponse> {
    return this.request<MetricsResponse>(
      `/campaigns/${campaignId}/metrics`
    );
  }

  // ✅ GET ANALYTICS
  async getAnalytics(campaignId: string): Promise<AnalyticsResponse> {
    return this.request<AnalyticsResponse>(
      `/campaigns/${campaignId}/analytics`
    );
  }

  // ✅ RUN SIMULATION
  async runSimulation(
    campaignId: string,
    data: SimulationRequest
  ): Promise<SimulationResponse> {
    return this.request<SimulationResponse>(
      `/campaigns/${campaignId}/run-simulation`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  // ✅ DELETE CAMPAIGN
  async deleteCampaign(campaignId: string): Promise<void> {
    await fetch(`${this.baseUrl}/campaigns/${campaignId}`, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
