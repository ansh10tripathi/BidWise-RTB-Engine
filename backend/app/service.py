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

from rtb_engine.campaign_simulator import run_campaign_simulation

# In-memory storage
campaigns_db: Dict[str, Campaign] = {}

# Cache for simulation results
simulation_cache: Dict[str, dict] = {}


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
        campaign = campaigns_db.get(campaign_id)
        if not campaign:
            return None
        
        # Check cache first
        if campaign_id not in simulation_cache:
            result = run_campaign_simulation(
                initial_budget=campaign.total_budget,
                base_bid=campaign.base_bid,
                strategy=campaign.strategy,
                conversion_weight=campaign.conversion_weight,
                device_targeting=campaign.device_targeting,
                active_hours=campaign.active_hours
            )
            simulation_cache[campaign_id] = result
        
        metrics_data = simulation_cache[campaign_id]["metrics"]
        return Metrics(**metrics_data)

    @staticmethod
    def get_analytics(campaign_id: str) -> Analytics:
        campaign = campaigns_db.get(campaign_id)
        if not campaign:
            return None
        
        # Check cache first
        if campaign_id not in simulation_cache:
            result = run_campaign_simulation(
                initial_budget=campaign.total_budget,
                base_bid=campaign.base_bid,
                strategy=campaign.strategy,
                conversion_weight=campaign.conversion_weight,
                device_targeting=campaign.device_targeting,
                active_hours=campaign.active_hours
            )
            simulation_cache[campaign_id] = result
        
        analytics_data = simulation_cache[campaign_id]["analytics"]
        
        return Analytics(
            hourly_performance=[HourlyPerformance(**hp) for hp in analytics_data["hourly_performance"]],
            device_performance={k: DevicePerformance(**v) for k, v in analytics_data["device_performance"].items()},
            feature_importance=[FeatureImportance(**fi) for fi in analytics_data["feature_importance"]]
        )

    @staticmethod
    def run_simulation(campaign_id: str, strategy: str) -> SimulationResponse:
        campaign = campaigns_db.get(campaign_id)
        if not campaign:
            return None
        
        # Clear cache to force re-simulation
        if campaign_id in simulation_cache:
            del simulation_cache[campaign_id]
        
        # Update strategy temporarily for this simulation
        original_strategy = campaign.strategy
        campaign.strategy = strategy
        
        metrics = CampaignService.get_metrics(campaign_id)
        
        # Restore original strategy
        campaign.strategy = original_strategy
        
        # Clear cache again
        if campaign_id in simulation_cache:
            del simulation_cache[campaign_id]
        
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
            # Clear cache
            if campaign_id in simulation_cache:
                del simulation_cache[campaign_id]
            return True
        return False
    
    @staticmethod
    def clear_cache(campaign_id: str = None):
        """Clear simulation cache for a specific campaign or all campaigns."""
        if campaign_id:
            if campaign_id in simulation_cache:
                del simulation_cache[campaign_id]
        else:
            simulation_cache.clear()
