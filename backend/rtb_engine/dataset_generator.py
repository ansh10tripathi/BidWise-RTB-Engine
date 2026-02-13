import numpy as np
import pandas as pd

def generate_dataset(n_rows=50000, save_path="../data/train.csv"):
    np.random.seed(42)

    impression_id = np.arange(n_rows)
    campaign_id = np.random.randint(1, 6, n_rows)
    hour = np.random.randint(0, 24, n_rows)
    device_type = np.random.choice([0, 1], n_rows)  # 0=desktop, 1=mobile

    floor_price = np.random.uniform(1, 5, n_rows)
    market_price = floor_price + np.random.uniform(0.5, 3, n_rows)

    # Base click probability
    base_ctr = 0.02

    # Evening boost
    evening_boost = np.where((hour >= 18) & (hour <= 22), 0.03, 0)

    # Campaign boost
    campaign_boost = np.where((campaign_id == 2) | (campaign_id == 3), 0.02, 0)

    click_prob = base_ctr + evening_boost + campaign_boost
    click = np.random.binomial(1, np.clip(click_prob, 0, 1))

    # Conversion probability depends on click + mobile + campaign
    base_cvr = 0.01
    mobile_boost = np.where(device_type == 1, 0.02, 0)
    conversion_prob = base_cvr + mobile_boost + (click * 0.05)
    conversion = np.random.binomial(1, np.clip(conversion_prob, 0, 1))

    df = pd.DataFrame({
        "impression_id": impression_id,
        "campaign_id": campaign_id,
        "hour": hour,
        "device_type": device_type,
        "floor_price": floor_price,
        "market_price": market_price,
        "click": click,
        "conversion": conversion
    })

    df.to_csv(save_path, index=False)
    print("Dataset generated successfully.")

if __name__ == "__main__":
    generate_dataset()
