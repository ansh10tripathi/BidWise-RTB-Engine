import pandas as pd
import os


def load_dataset(path="data/train.csv"):
    """
    Safe global dataset loader that supports both CSV and Excel formats.
    Normalizes columns and ensures correct data types.
    """

    if not os.path.exists(path):
        raise FileNotFoundError(f"Dataset file not found: {path}")

    # Load file
    if path.endswith(".csv"):
        df = pd.read_csv(path)

    elif path.endswith((".xls", ".xlsx")):
        df = pd.read_excel(path, engine="openpyxl")

    else:
        raise ValueError(f"Unsupported dataset format: {path}")

    # 🔥 CRITICAL FIX: Normalize column names
    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
    )

    # 🔥 Ensure numeric columns are correct type
    numeric_cols = [
        "campaign_id",
        "hour",
        "device_type",
        "floor_price",
        "market_price",
        "click",
        "conversion"
    ]

    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

    return df