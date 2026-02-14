"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { Campaign } from "@/types/campaign";
import { MetricsResponse } from "@/types/api";

interface UseCampaignReturn {
  campaign: Campaign | null;
  metrics: MetricsResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCampaign(campaignId: string | null): UseCampaignReturn {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!campaignId) return;

    try {
      setLoading(true);
      const [campaignData, metricsData] = await Promise.all([
        apiClient.getCampaign(campaignId),
        apiClient.getMetrics(campaignId),
      ]);
      setCampaign(campaignData);
      setMetrics(metricsData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  const fetchMetrics = useCallback(async () => {
    if (!campaignId) return;

    try {
      const metricsData = await apiClient.getMetrics(campaignId);
      setMetrics(metricsData);
    } catch (err) {
      console.error("Failed to fetch metrics:", err);
    }
  }, [campaignId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!campaignId) return;

    const interval = setInterval(() => {
      fetchMetrics();
    }, 3000);

    return () => clearInterval(interval);
  }, [campaignId, fetchMetrics]);

  return { campaign, metrics, loading, error, refetch: fetchData };
}
