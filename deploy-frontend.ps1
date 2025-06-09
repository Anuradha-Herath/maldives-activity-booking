# PowerShell Frontend-only deployment script
# This script deploys only the frontend with temporary fixes

Write-Host "=== MALDIVES ACTIVITY BOOKING - FRONTEND DEPLOYMENT SCRIPT ===" -ForegroundColor Cyan

# Navigate to project directory
Write-Host "==> Running from: $(Get-Location)" -ForegroundColor Yellow

# Check git status
Write-Host "==> Git status:" -ForegroundColor Yellow
git status

# Commit changes
Write-Host "==> Committing frontend fixes..." -ForegroundColor Yellow
git add client/vite.config.js client/.env.production
git commit -m "Temporary fix: Revert to old API routes until backend is updated"

# Push to repository
Write-Host "==> Pushing to repository..." -ForegroundColor Yellow
git push origin main

Write-Host "==> Frontend deployment process initiated!" -ForegroundColor Green
Write-Host "==> Go to Render dashboard to monitor the deployment:" -ForegroundColor Green
Write-Host "    https://dashboard.render.com" -ForegroundColor Blue
Write-Host "==> When deployment completes, test the frontend at:" -ForegroundColor Green
Write-Host "    https://maldives-activity-booking-frontend.onrender.com" -ForegroundColor Blue
Write-Host "=== DEPLOYMENT SCRIPT COMPLETE ===" -ForegroundColor Cyan
