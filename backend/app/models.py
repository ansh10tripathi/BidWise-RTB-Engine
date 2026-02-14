from pydantic import BaseModel, Field
from typing import List, Literal
from datetime import datetime


class CreateCampaignRequest(BaseModel):
    campaign_name: str = Field(..., alias="campaignName", min_length=1)
    total_budget: float = Field(..., alias="totalBudget", gt=0)
    base_bid: float = Field(..., alias="baseBid", gt=0)
    strategy: Literal["baseline", "optimized"]
    conversion_weight: int = Field(..., alias="conversionWeight", ge=1, le=20)
    device_targeting: Literal["mobile", "desktop", "all"] = Field(..., alias="deviceTargeting")
    active_hours: List[int] = Field(..., alias="activeHours", min_items=1)

    class Config:
        populate_by_name = True


class Campaign(BaseModel):
    id: str
    campaign_name: str
    total_budget: float
    base_bid: float
    strategy: str
    conversion_weight: int
    device_targeting: str
    active_hours: List[int]
    status: str
    created_at: datetime

class Metrics(BaseModel):
    total_impressions: int
    total_clicks: int
    total_conversions: int
    total_spent: float
    remaining_budget: float
    ctr: float
    cvr: float
    score: int
    avg_cpc: float

class HourlyPerformance(BaseModel):
    hour: int
    clicks: int
    conversions: int
    ctr: float

class DevicePerformance(BaseModel):
    clicks: int
    conversions: int
    ctr: float
    cvr: float

class FeatureImportance(BaseModel):
    feature: str
    importance: float

class Analytics(BaseModel):
    hourly_performance: List[HourlyPerformance]
    device_performance: dict[str, DevicePerformance]
    feature_importance: List[FeatureImportance]

class SimulationRequest(BaseModel):
    strategy: Literal["baseline", "optimized"]

class SimulationResponse(BaseModel):
    strategy: str
    metrics: Metrics
    timestamp: datetime
