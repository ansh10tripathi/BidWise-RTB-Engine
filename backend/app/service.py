from datetime import datetime
from uuid import uuid4
from typing import Dict, Optional

from .models import (
    CreateCampaignRequest,
    Campaign,
    Metrics,
    Analytics,
    HourlyPerformance,
    DevicePerformance,
    FeatureImportance,
    SimulationResponse,
)

# In-memory storage
campaigns_db: Dict[str, Campaign] = {}


class CampaignService:

    @staticmethod
    def create_campaign(request: CreateCampaignRequest) -> Campaign:
        campaign_id = str(uuid4())

        campaign = Campaign(
            id=campaign_id,
            campaign_name=request.campaign_name,
            total_budget=request.total_budget,
            base_bid=request.base_bid,
            strategy=request.strategy,
            conversion_weight=request.conversion_weight,
            device_targeting=request.device_targeting,
            active_hours=request.active_hours,
            status="active",
            created_at=datetime.now(),
        )

        campaigns_db[campaign_id] = campaign
        return campaign

    @staticmethod
    def get_campaign(campaign_id: str) -> Optional[Campaign]:
        return campaigns_db.get(campaign_id)

    @staticmethod
    def get_all_campaigns():
        return list(campaigns_db.values())

    @staticmethod
    def get_metrics(campaign_id: str) -> Metrics:
        return Metrics(
            total_impressions=38450,
            total_clicks=1580,
            total_conversions=142,
            total_spent=9920.80,
            remaining_budget=79.20,
            ctr=4.11,
            cvr=8.99,
            score=1722,
            avg_cpc=6.28,
        )

    @staticmethod
    def get_analytics(campaign_id: str) -> Analytics:
        return Analytics(
            hourly_performance=[
                HourlyPerformance(hour=0, clicks=42, conversions=3, ctr=3.28),
                HourlyPerformance(hour=6, clicks=55, conversions=5, ctr=3.79),
                HourlyPerformance(hour=10, clicks=78, conversions=8, ctr=4.22),
                HourlyPerformance(hour=14, clicks=92, conversions=10, ctr=4.42),
                HourlyPerformance(hour=18, clicks=128, conversions=15, ctr=5.08),
                HourlyPerformance(hour=20, clicks=148, conversions=18, ctr=5.32),
                HourlyPerformance(hour=22, clicks=138, conversions=14, ctr=5.21),
            ],
            device_performance={
                "mobile": DevicePerformance(clicks=890, conversions=85, ctr=4.52, cvr=9.55),
                "desktop": DevicePerformance(clicks=690, conversions=57, ctr=3.58, cvr=8.26),
            },
            feature_importance=[
                FeatureImportance(feature="Hour", importance=0.35),
                FeatureImportance(feature="Campaign", importance=0.28),
                FeatureImportance(feature="Device", importance=0.22),
                FeatureImportance(feature="Floor Price", importance=0.15),
            ],
        )

    @staticmethod
    def run_simulation(campaign_id: str, strategy: str) -> SimulationResponse:
        metrics = CampaignService.get_metrics(campaign_id)

        return SimulationResponse(
            strategy=strategy,
            metrics=metrics,
            timestamp=datetime.now(),
        )

    @staticmethod
    def delete_campaign(campaign_id: str) -> bool:
        """Delete a campaign by ID. Returns True if deleted, False if not found."""
        if campaign_id in campaigns_db:
            del campaigns_db[campaign_id]
            return True
        return False
