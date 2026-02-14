from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from .models import (
    CreateCampaignRequest,
    Campaign,
    Metrics,
    Analytics,
    SimulationRequest,
    SimulationResponse,
)

from .service import CampaignService

# 🔥 IMPORTANT: Rename engine functions to avoid conflict
from rtb_engine.simulator import run_simulation as engine_run_simulation
from rtb_engine.simulator import run_baseline
from rtb_engine.eda import run_eda
from rtb_engine.advanced_analytics import (
    get_hourly_trend,
    get_market_price_histogram,
    get_feature_importance,
    get_model_confidence,
)

app = FastAPI(title="BidWise RTB API", version="1.0.0")

# ✅ CORS (safe for dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev mode
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# CAMPAIGN CRUD ROUTES
# ==============================

@app.post("/create-campaign", response_model=Campaign, status_code=201)
async def create_campaign(request: CreateCampaignRequest):
    campaign = CampaignService.create_campaign(request)
    return campaign


@app.get("/campaigns", response_model=List[Campaign])
async def list_campaigns():
    return CampaignService.get_all_campaigns()


@app.get("/campaigns/{campaign_id}", response_model=Campaign)
async def get_campaign(campaign_id: str):
    campaign = CampaignService.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign


@app.delete("/campaigns/{campaign_id}", status_code=204)
async def delete_campaign(campaign_id: str):
    deleted = CampaignService.delete_campaign(campaign_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return None


# ==============================
# CAMPAIGN ANALYTICS
# ==============================

@app.get("/campaigns/{campaign_id}/metrics", response_model=Metrics)
async def get_metrics(campaign_id: str):
    campaign = CampaignService.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return CampaignService.get_metrics(campaign_id)


@app.get("/campaigns/{campaign_id}/analytics", response_model=Analytics)
async def get_analytics(campaign_id: str):
    campaign = CampaignService.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return CampaignService.get_analytics(campaign_id)


@app.post("/campaigns/{campaign_id}/run-simulation", response_model=SimulationResponse)
async def run_campaign_simulation(campaign_id: str, request: SimulationRequest):
    campaign = CampaignService.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return CampaignService.run_simulation(campaign_id, request.strategy)


# ==============================
# ENGINE ROUTES (NO CONFLICT NOW)
# ==============================

@app.get("/baseline")
def baseline():
    return run_baseline()


@app.get("/optimized")
def optimized():
    return engine_run_simulation()  # 🔥 FIXED


@app.get("/eda")
def eda():
    return run_eda()


@app.get("/analytics/hourly")
def analytics_hourly():
    return get_hourly_trend()


@app.get("/analytics/market-price")
def analytics_market_price():
    return get_market_price_histogram()


@app.get("/analytics/feature-importance")
def analytics_feature_importance():
    return get_feature_importance()


@app.get("/analytics/confidence")
def analytics_confidence():
    return get_model_confidence()


# ==============================
# HEALTH + ROOT
# ==============================

@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/")
def root():
    return {"message": "BidWise RTB API Running 🚀"}
