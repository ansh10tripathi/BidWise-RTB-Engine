# Testing Guide - Dynamic Dashboard

## 🧪 Quick Test Steps

### Step 1: Start Backend
```bash
cd backend
python -m uvicorn app.routes:app --reload --port 8000
```

### Step 2: Start Frontend
```bash
cd frontend
npm run dev
```

### Step 3: Create Test Campaigns

#### Create Baseline Campaign
```bash
curl -X POST http://localhost:8000/create-campaign \
  -H "Content-Type: application/json" \
  -d '{
    "campaignName": "Baseline Strategy",
    "totalBudget": 10000,
    "baseBid": 5,
    "strategy": "baseline",
    "conversionWeight": 5,
    "deviceTargeting": "all",
    "activeHours": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  }'
```

#### Create Optimized Campaign
```bash
curl -X POST http://localhost:8000/create-campaign \
  -H "Content-Type: application/json" \
  -d '{
    "campaignName": "Optimized Strategy",
    "totalBudget": 10000,
    "baseBid": 10,
    "strategy": "optimized",
    "conversionWeight": 5,
    "deviceTargeting": "all",
    "activeHours": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  }'
```

### Step 4: View Dashboard

Open browser: `http://localhost:3000`

**Expected Results:**

✅ **Baseline Campaign View:**
- Shows total impressions, clicks, conversions
- Shows CTR, CVR, Avg CPC
- Shows budget remaining
- NO performance banner (baseline strategy)
- NO comparison KPIs

✅ **Optimized Campaign View:**
- Shows total impressions, clicks, conversions
- Shows CTR, CVR, Avg CPC
- Shows budget remaining
- ✅ Performance banner with dynamic improvement %
- ✅ Comparison KPIs (vs baseline)

---

## 🔍 Verify Dynamic Calculations

### Test 1: Check Improvement Percentage

1. Select optimized campaign
2. Note the improvement percentage (e.g., +148.3%)
3. Open browser console
4. Check calculation:
   ```javascript
   // Should see dynamic calculation
   improvement = ((optimized_score - baseline_score) / baseline_score) * 100
   ```

### Test 2: Verify No Hardcoded Values

1. Search frontend code for:
   - ❌ "+29.1%" - Should NOT exist
   - ❌ "+49.5%" - Should NOT exist
   - ❌ "+25.7%" - Should NOT exist
   - ✅ "improvement.toFixed(1)" - Should exist

2. Check PerformanceBanner component:
   ```typescript
   // Should receive dynamic prop
   <PerformanceBanner improvement={improvement} />
   
   // improvement calculated as:
   const improvement = campaignMetrics && baselineMetrics && baselineMetrics.score > 0
     ? ((campaignMetrics.score - baselineMetrics.score) / baselineMetrics.score) * 100 
     : 0
   ```

### Test 3: Dataset Change Reflection

1. **Modify Dataset:**
   ```bash
   # Edit backend/data/train.csv
   # Add or remove some rows
   ```

2. **Clear Cache:**
   ```bash
   curl -X POST http://localhost:8000/clear-all-cache
   ```

3. **Refresh Dashboard:**
   - Press F5 or reload page
   - Improvement percentage should change
   - All metrics should update

4. **Verify:**
   - Old improvement: X%
   - New improvement: Y% (different from X)
   - ✅ Values changed = Dynamic working!

---

## 📊 Expected Metrics Examples

### Baseline Campaign (Example):
```
Total Impressions: 1,247
Total Clicks: 45
Total Conversions: 3
Campaign Score: 60

CTR: 3.61%
CVR: 6.67%
Avg CPC: $4.23
Budget Remaining: $4,732.15
```

### Optimized Campaign (Example):
```
Total Impressions: 1,523
Total Clicks: 89
Total Conversions: 12
Campaign Score: 149

CTR: 5.84%
CVR: 13.48%
Avg CPC: $3.87
Budget Remaining: $4,105.23

Performance Banner: +148.3% 📈

Comparison vs Baseline:
- Click Difference: +44
- Conversion Difference: +9
- Score Difference: +89
- Budget Efficiency: 98.5%
```

---

## 🐛 Troubleshooting

### Issue: Dashboard shows "No Campaigns Found"

**Solution:**
```bash
# Check if campaigns exist
curl http://localhost:8000/campaigns

# If empty, create campaigns (see Step 3)
```

### Issue: Improvement shows 0%

**Possible Causes:**
1. Baseline campaign selected (no comparison)
2. Baseline metrics not loaded
3. Baseline score is 0

**Solution:**
```bash
# Ensure optimized campaign is selected
# Check baseline endpoint works
curl http://localhost:8000/baseline

# Should return: {"clicks": X, "conversions": Y, "score": Z, ...}
```

### Issue: Metrics not updating after dataset change

**Solution:**
```bash
# Clear cache
curl -X POST http://localhost:8000/clear-all-cache

# Refresh dashboard
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

### Issue: API connection error

**Solution:**
```bash
# Check backend is running
curl http://localhost:8000/health

# Should return: {"status": "healthy"}

# Check CORS settings in routes.py
# Should allow origin: http://localhost:3000
```

---

## ✅ Validation Checklist

### Backend:
- [ ] Backend running on port 8000
- [ ] `/campaigns` endpoint returns campaigns
- [ ] `/campaigns/{id}/metrics` returns dynamic metrics
- [ ] `/baseline` endpoint works
- [ ] `/clear-all-cache` endpoint works

### Frontend:
- [ ] Frontend running on port 3000
- [ ] Dashboard loads without errors
- [ ] Campaign selector shows campaigns
- [ ] Metrics display correctly
- [ ] Performance banner shows for optimized campaigns
- [ ] Improvement percentage is dynamic (not hardcoded)
- [ ] Comparison KPIs show for optimized campaigns
- [ ] No hardcoded +29.1%, +49.5%, etc.

### Dynamic Behavior:
- [ ] Switching campaigns updates all metrics
- [ ] Dataset changes reflect after cache clear
- [ ] Improvement percentage recalculates
- [ ] All KPI cards update dynamically
- [ ] Budget tracking shows real values

---

## 🎯 Success Criteria

✅ **Dashboard is fully dynamic when:**

1. Improvement percentage changes when dataset changes
2. No hardcoded improvement values in code
3. All metrics come from `/campaigns/{id}/metrics`
4. Baseline comparison only for optimized campaigns
5. Campaign selector works correctly
6. All calculations use formula: `((optimized - baseline) / baseline) * 100`

---

## 📸 Screenshots to Verify

### Before (Static):
```
Performance Banner: +29.1% 📈  ❌ (Always same)
Click Difference: +1,234       ❌ (Hardcoded)
```

### After (Dynamic):
```
Performance Banner: +148.3% 📈  ✅ (Calculated from real data)
Click Difference: +44           ✅ (From actual metrics)
```

---

## 🚀 Quick Verification Command

```bash
# Run this to verify everything works
echo "Testing Backend..."
curl http://localhost:8000/health
curl http://localhost:8000/campaigns

echo "Testing Frontend..."
curl http://localhost:3000

echo "If all return 200 OK, system is working!"
```

---

## 📝 Notes

- First load may take 100-500ms (runs simulation)
- Subsequent loads are instant (cached)
- Clear cache after dataset changes
- Improvement percentage only shows for optimized campaigns
- Baseline campaigns show metrics only (no comparison)

---

## ✅ Final Check

Run through this checklist:

1. [ ] Create 2 campaigns (baseline + optimized)
2. [ ] View baseline campaign - no performance banner
3. [ ] View optimized campaign - shows performance banner
4. [ ] Note improvement percentage
5. [ ] Modify dataset
6. [ ] Clear cache
7. [ ] Refresh dashboard
8. [ ] Improvement percentage changed
9. [ ] All metrics updated
10. [ ] No errors in console

**If all checked: Dashboard is fully dynamic! 🎉**
