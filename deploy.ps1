# PowerShell Deployment Script

Write-Host "=== MALDIVES ACTIVITY BOOKING - DEPLOYMENT SCRIPT ===" -ForegroundColor Cyan

# Navigate to project directory
Write-Host "==> Running from: $(Get-Location)" -ForegroundColor Yellow

# Check git status
Write-Host "==> Git status:" -ForegroundColor Yellow
git status

# Commit changes
Write-Host "==> Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "Fix: Express duplicate import and API route paths"

# Push to repository
Write-Host "==> Pushing to repository..." -ForegroundColor Yellow
git push origin main

Write-Host "==> Deployment process initiated!" -ForegroundColor Green
Write-Host "==> Go to Render dashboard to monitor the deployment:" -ForegroundColor Green
Write-Host "    https://dashboard.render.com" -ForegroundColor Blue
Write-Host "==> When deployment completes, test the API at:" -ForegroundColor Green
Write-Host "    https://maldives-activity-booking-backend.onrender.com/api/v1" -ForegroundColor Blue
Write-Host "=== DEPLOYMENT SCRIPT COMPLETE ===" -ForegroundColor Cyan
