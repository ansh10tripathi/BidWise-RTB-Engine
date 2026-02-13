import joblib
import pandas as pd

class Predictor:
    def __init__(self):
        self.ctr_model = joblib.load("models/ctr_model.pkl")
        self.cvr_model = joblib.load("models/cvr_model.pkl")

        self.feature_columns = [
            "campaign_id",
            "hour",
            "device_type",
            "floor_price",
            "market_price"
        ]

    def predict_ctr(self, features):
        df = pd.DataFrame([features], columns=self.feature_columns)
        return self.ctr_model.predict_proba(df)[0][1]

    def predict_cvr(self, features):
        df = pd.DataFrame([features], columns=self.feature_columns)
        return self.cvr_model.predict_proba(df)[0][1]
