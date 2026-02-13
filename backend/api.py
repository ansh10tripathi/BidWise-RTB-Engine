from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rtb_engine.simulator import run_simulation, run_baseline
from rtb_engine.eda import run_eda
from rtb_engine.advanced_analytics import get_hourly_trend, get_market_price_histogram, get_feature_importance, get_model_confidence


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "BidWise RTB Engine Running Successfully 🚀"}

@app.get("/baseline")
def baseline():
    return run_baseline()


@app.get("/optimized")
def optimized():
    return run_simulation()


@app.get("/simulate")
def simulate(strategy: str = "optimized"):
    if strategy == "baseline":
        return run_baseline()
    else:
        return run_simulation()
    
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
