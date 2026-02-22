import pandas as pd
from rtb_engine.dataset_loader import load_dataset

def run_eda():
    df = load_dataset("data/train.csv")

    total_rows = len(df)
    total_clicks = df["click"].sum()
    total_conversions = df["conversion"].sum()

    ctr = total_clicks / total_rows if total_rows else 0
    cvr = total_conversions / total_rows if total_rows else 0

    avg_market_price = df["market_price"].mean()

    device_distribution = (
        df["device_type"]
        .value_counts(normalize=True)
        .to_dict()
    )

    return {
        "total_rows": int(total_rows),
        "total_clicks": int(total_clicks),
        "total_conversions": int(total_conversions),
        "ctr": round(ctr, 4),
        "cvr": round(cvr, 4),
        "avg_market_price": round(avg_market_price, 2),
        "device_distribution": device_distribution
    }
