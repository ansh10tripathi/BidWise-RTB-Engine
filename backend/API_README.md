# BidWise RTB API

FastAPI backend for the BidWise Real-Time Bidding platform.

## 🚀 Quick Start

### Install Dependencies
```bash
pip install -r requirements_api.txt
```

### Run Server
```bash
python main_api.py
```

Server runs on: http://localhost:8000

## 📡 API Endpoints

### Create Campaign
```http
POST /create-campaign
Content-Type: application/json

{
  "campaign_name": "Summer Sale 2024",
  "total_budget": 10000,
  "base_bid": 5.0,
  "strategy": "optimized",
  "conversion_weight": 10,
  "device_targeting": "all",
  "active_hours": [0, 1, 2, 18, 19, 20, 21, 22, 23]
}
```

### Get Campaign
```http
GET /campaigns/{campaign_id}
```

### Get Metrics
```http
GET /campaigns/{campaign_id}/metrics
```

### Get Analytics
```http
GET /campaigns/{campaign_id}/analytics
```

### Run Simulation
```http
POST /campaigns/{campaign_id}/run-simulation
Content-Type: application/json

{
  "strategy": "optimized"
}
```

### Health Check
```http
GET /health
```

## 📚 Documentation

Interactive API docs available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🏗 Architecture

```
backend/
├── app/
│   ├── models.py      # Pydantic schemas
│   ├── service.py     # Business logic
│   └── routes.py      # FastAPI routes
├── main_api.py        # Entry point
└── requirements_api.txt
```

## 🔧 Features

- ✅ Pydantic validation
- ✅ In-memory storage
- ✅ CORS enabled
- ✅ Clean service layer
- ✅ Type hints
- ✅ Auto-generated docs
- ✅ Production-ready structure
