import pandas as pd
from rtb_engine.predicator import Predictor
from rtb_engine.budget_manager import BudgetManager
from rtb_engine.strategy import BiddingStrategy

def run_simulation(initial_budget=10000):
    df = pd.read_csv("data/train.csv")

    predictor = Predictor()
    budget_manager = BudgetManager(initial_budget)

    # Prepare features once
    feature_columns = [
        "campaign_id",
        "hour",
        "device_type",
        "floor_price",
        "market_price"
    ]

    X = df[feature_columns]

    # Vectorized prediction (FAST)
    ctr_probs = predictor.ctr_model.predict_proba(X)[:, 1]
    cvr_probs = predictor.cvr_model.predict_proba(X)[:, 1]

    total_clicks = 0
    total_conversions = 0
    conversion_weight = 5
    base_bid = 10

    for i in range(len(df)):

        ctr = ctr_probs[i]
        cvr = cvr_probs[i]

        # Value of impression
        value = ctr_probs[i] + conversion_weight * cvr_probs[i]

        # Make bid proportional to expected ROI vs market
        market_price = df.iloc[i]["market_price"]

        roi_factor = value / (market_price + 1e-6)

        scaled_value = roi_factor * 1000

        budget_factor = budget_manager.get_budget_factor()
        bid = scaled_value * budget_factor


        # If strong predicted value → stay competitive
        if value > 0.02:
            bid = max(bid, market_price * 0.8)

        # Avoid extreme overbidding
        bid = min(bid, market_price * 1.5)

        # Win auction
        if bid >= market_price and budget_manager.can_bid(market_price):
            budget_manager.deduct(market_price)

            if df.iloc[i]["click"] == 1:
                total_clicks += 1

            if df.iloc[i]["conversion"] == 1:
                total_conversions += 1

        if budget_manager.remaining_budget <= 0:
            break

    final_score = total_clicks + conversion_weight * total_conversions

    return {
        "clicks": total_clicks,
        "conversions": total_conversions,
        "score": final_score,
        "remaining_budget": budget_manager.remaining_budget
    }


def run_baseline(initial_budget=10000, fixed_bid=5):
    df = pd.read_csv("data/train.csv")

    budget_manager = BudgetManager(initial_budget)

    total_clicks = 0
    total_conversions = 0
    conversion_weight = 5

    for i in range(len(df)):

        market_price = df.iloc[i]["market_price"]

        if fixed_bid >= market_price and budget_manager.can_bid(market_price):
            budget_manager.deduct(market_price)

            if df.iloc[i]["click"] == 1:
                total_clicks += 1

            if df.iloc[i]["conversion"] == 1:
                total_conversions += 1

        if budget_manager.remaining_budget <= 0:
            break

    final_score = total_clicks + conversion_weight * total_conversions

    return {
        "clicks": total_clicks,
        "conversions": total_conversions,
        "score": final_score,
        "remaining_budget": budget_manager.remaining_budget
    }
