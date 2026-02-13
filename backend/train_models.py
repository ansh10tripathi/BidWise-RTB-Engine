import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

# Load dataset
df = pd.read_csv("data/train.csv")

# Feature columns
features = [
    "campaign_id",
    "hour",
    "device_type",
    "floor_price",
    "market_price"
]

X = df[features]

# Targets
y_click = df["click"]
y_conversion = df["conversion"]

# Split data
X_train, X_val, y_click_train, y_click_val = train_test_split(
    X, y_click, test_size=0.2, random_state=42
)

_, _, y_conv_train, y_conv_val = train_test_split(
    X, y_conversion, test_size=0.2, random_state=42
)

# Train CTR model
ctr_model = LogisticRegression(max_iter=500)
ctr_model.fit(X_train, y_click_train)

# Train CVR model
cvr_model = LogisticRegression(max_iter=500)
cvr_model.fit(X_train, y_conv_train)

# Validation
ctr_pred = ctr_model.predict_proba(X_val)[:, 1]
cvr_pred = cvr_model.predict_proba(X_val)[:, 1]

print("CTR ROC-AUC:", roc_auc_score(y_click_val, ctr_pred))
print("CVR ROC-AUC:", roc_auc_score(y_conv_val, cvr_pred))

# Save models
joblib.dump(ctr_model, "models/ctr_model.pkl")
joblib.dump(cvr_model, "models/cvr_model.pkl")

print("Models saved successfully.")
