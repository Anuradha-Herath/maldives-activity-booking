# PowerShell script to deploy frontend with upload fixes
Write-Host "=== MALDIVES ACTIVITY BOOKING - UPLOAD FIX DEPLOYMENT ===" -ForegroundColor Cyan

# Navigate to project directory
Set-Location "c:\Users\Anuradha\Downloads\Moratuwa Academic\Projects\Lush\maldives-activity-booking"
Write-Host "==> Working directory: $(Get-Location)" -ForegroundColor Yellow

# Check git status
Write-Host "==> Current git status:" -ForegroundColor Yellow
git status

# Build the frontend to verify everything compiles
Write-Host "==> Building frontend to verify fixes..." -ForegroundColor Yellow
Set-Location "client"
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}

# Return to root directory
Set-Location ".."

# Stage and commit the upload fixes
Write-Host "==> Staging upload fix changes..." -ForegroundColor Yellow
git add client/src/utils/api.js
git add client/src/pages/admin/ActivityForm.jsx
git add -A

Write-Host "==> Committing upload fixes..." -ForegroundColor Yellow
git commit -m "Fix: Resolve image upload CORS and Content-Type header issues

- Fixed API instance to handle FormData uploads correctly
- Removed conflicting Content-Type header for multipart uploads
- Updated ActivityForm to use proper API instance
- Added FormData detection in request interceptor

This should resolve the 'Uploaded 0 of 1 gallery images' error."

# Push changes
Write-Host "==> Pushing upload fixes to repository..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Changes pushed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to push changes!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== DEPLOYMENT STATUS ===" -ForegroundColor Cyan
Write-Host "✅ Upload fixes deployed to repository" -ForegroundColor Green
Write-Host "🚀 Frontend deployment will start automatically on Render" -ForegroundColor Yellow
Write-Host ""
Write-Host "==> Monitor deployment at:" -ForegroundColor Yellow
Write-Host "    https://dashboard.render.com" -ForegroundColor Blue
Write-Host ""
Write-Host "==> Test the fix at:" -ForegroundColor Yellow
Write-Host "    https://maldives-activity-booking-frontend.onrender.com/admin/activities/new" -ForegroundColor Blue
Write-Host ""
Write-Host "==> Key fixes applied:" -ForegroundColor Yellow
Write-Host "    - API instance now handles FormData uploads correctly" -ForegroundColor White
Write-Host "    - Removed conflicting Content-Type headers" -ForegroundColor White
Write-Host "    - ActivityForm uses proper API configuration" -ForegroundColor White
Write-Host "    - FormData detection prevents header conflicts" -ForegroundColor White
Write-Host ""
Write-Host "=== DEPLOYMENT COMPLETE ===" -ForegroundColor Cyan
