from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import os

from .models import (
    CreateCampaignRequest,
    Campaign,
    Metrics,
    Analytics,
    SimulationRequest,
    SimulationResponse,
)

from .service import CampaignService
from rtb_engine.dataset_loader import load_dataset

# Engine modules
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =================================================
# CAMPAIGN CRUD
# =================================================

@app.post("/create-campaign", response_model=Campaign, status_code=201)
async def create_campaign(
    campaignName: str = Form(...),
    totalBudget: float = Form(...),
    baseBid: float = Form(...),
    strategy: str = Form(...),
    conversionWeight: int = Form(...),
    deviceTargeting: str = Form(...),
    activeHours: str = Form(...),
    file: Optional[UploadFile] = File(None)
):
    if file:
        _, ext = os.path.splitext(file.filename)
        if ext.lower() not in [".csv", ".xls", ".xlsx"]:
            raise HTTPException(
                status_code=400,
                detail="Only CSV and Excel files (.csv, .xls, .xlsx) are supported"
            )

    return await CampaignService.create_campaign(
        campaignName,
        totalBudget,
        baseBid,
        strategy,
        conversionWeight,
        deviceTargeting,
        activeHours,
        file
    )


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
    if not CampaignService.delete_campaign(campaign_id):
        raise HTTPException(status_code=404, detail="Campaign not found")
    return None


# =================================================
# CAMPAIGN SIMULATION + ANALYTICS
# =================================================

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


# =================================================
# 🔥 CAMPAIGN-SPECIFIC ENGINE ANALYTICS (NEW)
# =================================================

@app.get("/campaigns/{campaign_id}/eda")
def campaign_eda(campaign_id: str):
    campaign = CampaignService.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    # Use campaign-specific dataset if uploaded, otherwise use default
    dataset_path = campaign.dataset_path if campaign.dataset_path else "data/train.csv"
    print(f"[EDA] Campaign ID: {campaign_id}, Dataset Path: {dataset_path}")
    df = load_dataset(dataset_path)
    print(f"[EDA] Loaded {len(df)} rows from {dataset_path}")
    
    # Calculate EDA metrics from campaign-specific data
    total_rows = len(df)
    total_clicks = df["click"].sum()
    total_conversions = df["conversion"].sum()
    ctr = total_clicks / total_rows if total_rows else 0
    cvr = total_conversions / total_rows if total_rows else 0
    avg_market_price = df["market_price"].mean()
    device_distribution = df["device_type"].value_counts(normalize=True).to_dict()
    
    result = {
        "total_rows": int(total_rows),
        "total_clicks": int(total_clicks),
        "total_conversions": int(total_conversions),
        "ctr": round(ctr, 4),
        "cvr": round(cvr, 4),
        "avg_market_price": round(avg_market_price, 2),
        "device_distribution": device_distribution
    }
    print(f"[EDA] Result: {result}")
    return result


@app.get("/campaigns/{campaign_id}/hourly")
def campaign_hourly(campaign_id: str):
    campaign = CampaignService.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    # Use campaign-specific dataset if uploaded, otherwise use default
    dataset_path = campaign.dataset_path if campaign.dataset_path else "data/train.csv"
    df = load_dataset(dataset_path)
    return get_hourly_trend(df)


@app.get("/campaigns/{campaign_id}/market-price")
def campaign_market_price(campaign_id: str):
    campaign = CampaignService.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    # Use campaign-specific dataset if uploaded, otherwise use default
    dataset_path = campaign.dataset_path if campaign.dataset_path else "data/train.csv"
    df = load_dataset(dataset_path)
    return get_market_price_histogram(df)


@app.get("/campaigns/{campaign_id}/feature-importance")
def campaign_feature_importance(campaign_id: str):
    campaign = CampaignService.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    # Use campaign-specific dataset if uploaded, otherwise use default
    dataset_path = campaign.dataset_path if campaign.dataset_path else "data/train.csv"
    df = load_dataset(dataset_path)
    return get_feature_importance(df)


@app.get("/campaigns/{campaign_id}/confidence")
def campaign_confidence(campaign_id: str):
    campaign = CampaignService.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    # Use campaign-specific dataset if uploaded, otherwise use default
    dataset_path = campaign.dataset_path if campaign.dataset_path else "data/train.csv"
    df = load_dataset(dataset_path)
    return get_model_confidence(df)


# =================================================
# DEFAULT ENGINE ROUTES (OPTIONAL)
# =================================================

@app.get("/baseline")
def baseline():
    return run_baseline()


@app.get("/optimized")
def optimized():
    return engine_run_simulation()


@app.get("/eda")
def eda():
    df = load_dataset("data/train.csv")
    return run_eda()


@app.get("/analytics/hourly")
def analytics_hourly():
    df = load_dataset("data/train.csv")
    return get_hourly_trend(df)


@app.get("/analytics/market-price")
def analytics_market_price():
    df = load_dataset("data/train.csv")
    return get_market_price_histogram(df)


@app.get("/analytics/feature-importance")
def analytics_feature_importance():
    df = load_dataset("data/train.csv")
    return get_feature_importance(df)


@app.get("/analytics/confidence")
def analytics_confidence():
    df = load_dataset("data/train.csv")
    return get_model_confidence(df)


# =================================================
# HEALTH
# =================================================

@app.get("/health")
def health():
    return {"status": "healthy"}