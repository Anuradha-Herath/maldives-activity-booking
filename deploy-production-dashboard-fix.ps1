# PowerShell script to deploy production-specific dashboard update fix

Write-Host "=== MALDIVES ACTIVITY BOOKING - PRODUCTION DASHBOARD FIX DEPLOYMENT ===" -ForegroundColor Cyan

# Navigate to project directory
$projectRoot = Get-Location
Write-Host "==> Running from: $projectRoot" -ForegroundColor Yellow

# Check git status
Write-Host "==> Git status:" -ForegroundColor Yellow
git status

# Add modified files
Write-Host "==> Adding modified files..." -ForegroundColor Yellow
git add client/src/pages/BookingRequest.jsx
git add client/src/pages/dashboard/Dashboard.jsx
git add client/src/pages/dashboard/MyBookings.jsx
git add client/src/hooks/useDirectDataUpdate.js
git add client/src/utils/api.js
git add client/src/utils/BookingEventEmitter.js
git add client/src/main.jsx
git add client/src/utils/registerServiceWorker.js
git add client/public/cache-buster-sw.js
git add build-with-dashboard-fix.sh
git add build-with-dashboard-fix.ps1
git add PRODUCTION_DASHBOARD_UPDATE_FIX.md

# Commit the changes
Write-Host "==> Committing production dashboard fix..." -ForegroundColor Yellow
git commit -m "Fix: Production-specific dashboard update solution"

# Push to repository
Write-Host "==> Pushing to repository..." -ForegroundColor Yellow
git push origin main

Write-Host "==> Production fix deployment process initiated!" -ForegroundColor Green
Write-Host "==> Go to Render dashboard to monitor the deployment:" -ForegroundColor Green
Write-Host "    https://dashboard.render.com" -ForegroundColor Blue
Write-Host "==> When deployment completes, test the frontend at:" -ForegroundColor Green
Write-Host "    https://maldives-activity-booking-frontend.onrender.com" -ForegroundColor Blue
Write-Host "==> Wait for the deployment to complete (typically 5-10 minutes)" -ForegroundColor Green
Write-Host "==> Then test the fix by creating a booking and checking the dashboard" -ForegroundColor Green
Write-Host "=== DEPLOYMENT SCRIPT COMPLETE ===" -ForegroundColor Cyan
