# 🚀 Quick Start Guide

## Start Backend API

### Option 1: Using the batch file (Windows)
```bash
start_backend.bat
```

### Option 2: Manual start
```bash
cd backend
python main_api.py
```

The API will start on: **http://localhost:8000**

## Start Frontend

```bash
cd ad-portal
npm run dev
```

The frontend will start on: **http://localhost:3000**

## Verify Backend is Running

Open your browser and go to:
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

## Troubleshooting

### "Failed to create campaign" error

1. **Check if backend is running:**
   - Open http://localhost:8000/health
   - Should return: `{"status": "healthy"}`

2. **Check console for errors:**
   - Open browser DevTools (F12)
   - Look at Console and Network tabs

3. **Verify CORS is enabled:**
   - Backend should allow requests from http://localhost:3000

4. **Check field names:**
   - Frontend uses camelCase (campaignName)
   - Backend uses snake_case (campaign_name)
   - The fix handles this conversion

### Common Issues

**Port already in use:**
```bash
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Missing dependencies:**
```bash
cd backend
pip install -r requirements_api.txt
```

## Testing the API

### Create Campaign (curl)
```bash
curl -X POST http://localhost:8000/create-campaign \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_name": "Test Campaign",
    "total_budget": 10000,
    "base_bid": 5.0,
    "strategy": "optimized",
    "conversion_weight": 10,
    "device_targeting": "all",
    "active_hours": [0,1,2,18,19,20,21,22,23]
  }'
```

### Get Campaign
```bash
curl http://localhost:8000/campaigns/{campaign_id}
```

## Success!

Once both servers are running:
1. Go to http://localhost:3000/login
2. Login with any credentials
3. Navigate to Campaigns → Create Campaign
4. Fill out the form and submit
5. Campaign should be created successfully!
