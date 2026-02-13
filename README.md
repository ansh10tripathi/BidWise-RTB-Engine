# 🚀 BidWise – Real-Time Bidding (RTB) DSP Optimization Engine

> AI-powered Demand Side Platform (DSP) engine for optimizing Real-Time Bidding under budget constraints using machine learning and expected value optimization.

---

## 📌 Overview

BidWise is a machine learning–driven Real-Time Bidding (RTB) engine designed to maximize:

Score = Clicks + N × Conversions

under strict constraints:

- 💰 Fixed advertiser budget  
- ⚖ Second-price auction mechanism  
- ⏱ Low-latency inference  
- 🧠 Sequential decision making (no future request knowledge)  
- 📦 Memory-efficient implementation  

This project simulates a real-world ad-tech bidding system used in programmatic advertising platforms.

---

## 🧠 Core Concepts

### 🔹 CTR Prediction (Click-Through Rate)
Predicts probability that a user clicks an ad.

### 🔹 CVR Prediction (Conversion Rate)
Predicts probability that a user converts after clicking.

### 🔹 Expected Value Optimization

EV = P(click) + N × P(conversion)

### 🔹 Budget-Aware Dynamic Bidding

Bid = EV × BaseBid × BudgetFactor

Where:

BudgetFactor = RemainingBudget / InitialBudget

### 🔹 Second-Price Auction Logic

If:

Bid ≥ Market Price

- Win auction  
- Pay second-highest price (market price)  
- Deduct budget  
- Update score  

---

## 🛠 Tech Stack

### Backend
- Python 3.9
- Pandas
- NumPy
- Scikit-learn (Logistic Regression)
- Joblib

### Machine Learning
- CTR Logistic Regression Model
- CVR Logistic Regression Model
- ROC-AUC Validation
- Vectorized Inference Optimization

### Frontend (Planned)
- Next.js
- Tailwind CSS
- Recharts / Chart.js
- Light/Dark Theme Toggle

---

## 🏗 Project Structure

```
BIDWISE_RTB/
│
├── backend/
│   ├── data/
│   │   └── train.csv
│   │
│   ├── models/
│   │   ├── ctr_model.pkl
│   │   └── cvr_model.pkl
│   │
│   ├── rtb_engine/
│   │   ├── predictor.py
│   │   ├── budget_manager.py
│   │   ├── strategy.py
│   │   ├── simulator.py
│   │   └── dataset_generator.py
│   │
│   ├── train_models.py
│   └── main.py
│
├── frontend/
└── README.md
```

---

## 📊 Dataset

Synthetic RTB dataset (50,000 rows) with realistic patterns:

- Evening hours → Higher CTR  
- Campaign 2 & 3 → Better performance  
- Mobile → Higher conversion rate  
- Conversion depends on click probability  

Columns:

- impression_id  
- campaign_id  
- hour  
- device_type  
- floor_price  
- market_price  
- click  
- conversion  

---

## ⚡ Performance Optimization

- Vectorized CTR & CVR prediction  
- Reduced per-row ML inference  
- Budget-aware early stopping  
- Lightweight Logistic Regression models  
- Optimized simulation loop  

---

## 📈 Baseline vs Optimized Strategy

The system compares:

### 🔹 Baseline Strategy
Fixed bid for every impression.

### 🔹 Optimized Strategy
Expected Value–based dynamic bidding with budget scaling.

This demonstrates measurable improvement in score under budget constraints.

---

## 🚀 How To Run

### 1️⃣ Install Dependencies

```bash
pip install -r backend/requirements.txt
```

### 2️⃣ Generate Dataset

```bash
python backend/rtb_engine/dataset_generator.py
```

### 3️⃣ Train Models

```bash
cd backend
python train_models.py
```

### 4️⃣ Run Simulation

```bash
python main.py
```

---

## 🎯 Key Learning Outcomes

This project demonstrates:

- Real-world ad-tech optimization logic  
- Budget-constrained decision systems  
- Applied machine learning in auction environments  
- Performance-aware algorithm design  
- Sequential online optimization  

---

## 🔮 Future Improvements

- Advanced budget pacing algorithm  
- Multi-armed bandit strategy  
- Reinforcement learning optimization  
- FastAPI backend integration  
- Modern analytics dashboard (Next.js)  
- Deployment to cloud  

---

## 👨‍💻 Author

Developed as part of a Hackathon RTB Optimization Challenge.
