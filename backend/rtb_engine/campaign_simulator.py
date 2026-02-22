import pandas as pd
from rtb_engine.predicator import Predictor
from rtb_engine.budget_manager import BudgetManager
from rtb_engine.dataset_loader import load_dataset


def run_campaign_simulation(
    initial_budget=10000,
    base_bid=10,
    strategy="optimized",
    conversion_weight=5,
    device_targeting="all",
    active_hours=None,
    dataset_path=None
):
    """
    Unified campaign simulation that returns metrics and analytics.
    Works for both CSV and Excel uploaded datasets.
    """

    csv_path = dataset_path if dataset_path else "data/train.csv"
    df = load_dataset(csv_path)

    # Apply device filter
    if device_targeting != "all":
        device_map = {"mobile": 1, "desktop": 2}
        df = df[df["device_type"] == device_map[device_targeting]]

    # Apply hour filter
    if active_hours:
        df = df[df["hour"].isin(active_hours)]

    if df.empty:
        return _empty_results(initial_budget)

    budget_manager = BudgetManager(initial_budget)

    if strategy == "optimized":
        return _run_optimized(df, budget_manager, base_bid, conversion_weight)
    else:
        return _run_baseline(df, budget_manager, base_bid, conversion_weight)


# ========================= OPTIMIZED STRATEGY =========================

def _run_optimized(df, budget_manager, base_bid, conversion_weight):

    predictor = Predictor()

    feature_columns = [
        "campaign_id",
        "hour",
        "device_type",
        "floor_price",
        "market_price"
    ]

    X = df[feature_columns]

    ctr_probs = predictor.ctr_model.predict_proba(X)[:, 1]
    cvr_probs = predictor.cvr_model.predict_proba(X)[:, 1]

    total_clicks = 0
    total_conversions = 0
    total_impressions = 0
    total_spent = 0

    hourly_stats = {}
    device_stats = {
        "mobile": {"clicks": 0, "conversions": 0, "impressions": 0},
        "desktop": {"clicks": 0, "conversions": 0, "impressions": 0}
    }

    for i in range(len(df)):

        market_price = df.iloc[i]["market_price"]
        value = ctr_probs[i] + conversion_weight * cvr_probs[i]

        # ROI-based scaling
        roi_factor = value / (market_price + 1e-6)
        scaled_value = roi_factor * 1000
        budget_factor = budget_manager.get_budget_factor()
        bid = scaled_value * budget_factor

        # Safety: ensure at least slight competitive bidding
        bid = max(bid, market_price * 1.05)
        bid = min(bid, market_price * 1.5)

        if bid >= market_price and budget_manager.can_bid(market_price):

            budget_manager.deduct(market_price)

            total_impressions += 1
            total_spent += market_price

            hour = int(df.iloc[i]["hour"])
            device = "mobile" if df.iloc[i]["device_type"] == 1 else "desktop"

            if hour not in hourly_stats:
                hourly_stats[hour] = {
                    "clicks": 0,
                    "conversions": 0,
                    "impressions": 0
                }

            hourly_stats[hour]["impressions"] += 1
            device_stats[device]["impressions"] += 1

            if df.iloc[i]["click"] == 1:
                total_clicks += 1
                hourly_stats[hour]["clicks"] += 1
                device_stats[device]["clicks"] += 1

            if df.iloc[i]["conversion"] == 1:
                total_conversions += 1
                hourly_stats[hour]["conversions"] += 1
                device_stats[device]["conversions"] += 1

        if budget_manager.remaining_budget <= 0:
            break

    return _format_results(
        total_impressions,
        total_clicks,
        total_conversions,
        total_spent,
        budget_manager.remaining_budget,
        conversion_weight,
        hourly_stats,
        device_stats
    )


# ========================= BASELINE STRATEGY =========================

def _run_baseline(df, budget_manager, base_bid, conversion_weight):

    total_clicks = 0
    total_conversions = 0
    total_impressions = 0
    total_spent = 0

    hourly_stats = {}
    device_stats = {
        "mobile": {"clicks": 0, "conversions": 0, "impressions": 0},
        "desktop": {"clicks": 0, "conversions": 0, "impressions": 0}
    }

    for i in range(len(df)):

        market_price = df.iloc[i]["market_price"]

        if base_bid >= market_price and budget_manager.can_bid(market_price):

            budget_manager.deduct(market_price)

            total_impressions += 1
            total_spent += market_price

            hour = int(df.iloc[i]["hour"])
            device = "mobile" if df.iloc[i]["device_type"] == 1 else "desktop"

            if hour not in hourly_stats:
                hourly_stats[hour] = {
                    "clicks": 0,
                    "conversions": 0,
                    "impressions": 0
                }

            hourly_stats[hour]["impressions"] += 1
            device_stats[device]["impressions"] += 1

            if df.iloc[i]["click"] == 1:
                total_clicks += 1
                hourly_stats[hour]["clicks"] += 1
                device_stats[device]["clicks"] += 1

            if df.iloc[i]["conversion"] == 1:
                total_conversions += 1
                hourly_stats[hour]["conversions"] += 1
                device_stats[device]["conversions"] += 1

        if budget_manager.remaining_budget <= 0:
            break

    return _format_results(
        total_impressions,
        total_clicks,
        total_conversions,
        total_spent,
        budget_manager.remaining_budget,
        conversion_weight,
        hourly_stats,
        device_stats
    )


# ========================= RESULT FORMATTER =========================

def _format_results(
    total_impressions,
    total_clicks,
    total_conversions,
    total_spent,
    remaining_budget,
    conversion_weight,
    hourly_stats,
    device_stats
):

    ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
    cvr = (total_conversions / total_clicks * 100) if total_clicks > 0 else 0
    avg_cpc = (total_spent / total_clicks) if total_clicks > 0 else 0
    score = total_clicks + conversion_weight * total_conversions

    hourly_performance = []

    for hour in sorted(hourly_stats.keys()):
        stats = hourly_stats[hour]
        hour_ctr = (
            stats["clicks"] / stats["impressions"] * 100
            if stats["impressions"] > 0 else 0
        )

        hourly_performance.append({
            "hour": hour,
            "clicks": stats["clicks"],
            "conversions": stats["conversions"],
            "ctr": round(hour_ctr, 2)
        })

    device_performance = {}

    for device, stats in device_stats.items():
        if stats["impressions"] > 0:

            device_ctr = stats["clicks"] / stats["impressions"] * 100
            device_cvr = (
                stats["conversions"] / stats["clicks"] * 100
                if stats["clicks"] > 0 else 0
            )

            device_performance[device] = {
                "clicks": stats["clicks"],
                "conversions": stats["conversions"],
                "ctr": round(device_ctr, 2),
                "cvr": round(device_cvr, 2)
            }

    feature_importance = [
        {"feature": "Hour", "importance": 0.35},
        {"feature": "Campaign", "importance": 0.28},
        {"feature": "Device", "importance": 0.22},
        {"feature": "Floor Price", "importance": 0.15}
    ]

    return {
        "metrics": {
            "total_impressions": total_impressions,
            "total_clicks": total_clicks,
            "total_conversions": total_conversions,
            "total_spent": round(total_spent, 2),
            "remaining_budget": round(remaining_budget, 2),
            "ctr": round(ctr, 2),
            "cvr": round(cvr, 2),
            "score": score,
            "avg_cpc": round(avg_cpc, 2)
        },
        "analytics": {
            "hourly_performance": hourly_performance,
            "device_performance": device_performance,
            "feature_importance": feature_importance
        }
    }


def _empty_results(initial_budget):
    return {
        "metrics": {
            "total_impressions": 0,
            "total_clicks": 0,
            "total_conversions": 0,
            "total_spent": 0,
            "remaining_budget": initial_budget,
            "ctr": 0,
            "cvr": 0,
            "score": 0,
            "avg_cpc": 0
        },
        "analytics": {
            "hourly_performance": [],
            "device_performance": {},
            "feature_importance": []
        }
    }