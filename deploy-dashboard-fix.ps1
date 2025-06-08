# PowerShell Dashboard Fix Deployment Script
# This script deploys the dashboard refresh functionality fix to production

Write-Host "=== MALDIVES ACTIVITY BOOKING - DASHBOARD FIX DEPLOYMENT SCRIPT ===" -ForegroundColor Cyan

# Navigate to project directory
Write-Host "==> Running from: $(Get-Location)" -ForegroundColor Yellow

# Check git status
Write-Host "==> Git status:" -ForegroundColor Yellow
git status

# Commit changes
Write-Host "==> Committing dashboard refresh fixes..." -ForegroundColor Yellow
git add client/src/contexts/DashboardContext.jsx client/src/utils/api.js client/src/pages/dashboard/Dashboard.jsx client/src/pages/BookingRequest.jsx client/src/App.jsx
git commit -m "Fix: Dashboard not updating after booking creation in production"

# Push to repository
Write-Host "==> Pushing to repository..." -ForegroundColor Yellow
git push origin main

Write-Host "==> Dashboard fix deployment process initiated!" -ForegroundColor Green
Write-Host "==> Go to Render dashboard to monitor the deployment:" -ForegroundColor Green
Write-Host "    https://dashboard.render.com" -ForegroundColor Blue
Write-Host "==> When deployment completes, test the frontend at:" -ForegroundColor Green
Write-Host "    https://maldives-activity-booking-frontend.onrender.com" -ForegroundColor Blue
Write-Host "=== DEPLOYMENT SCRIPT COMPLETE ===" -ForegroundColor Cyan
