# PowerShell script to verify upload fix deployment
Write-Host "=== UPLOAD FIX VERIFICATION SCRIPT ===" -ForegroundColor Cyan

$frontendUrl = "https://maldives-activity-booking-frontend.onrender.com"
$backendUrl = "https://maldives-activity-booking-backend.onrender.com/api/v1"

Write-Host "🔍 Checking deployment status..." -ForegroundColor Yellow

# Test frontend accessibility
try {
    Write-Host "📱 Testing frontend accessibility..." -ForegroundColor White
    $frontendResponse = Invoke-WebRequest -Uri $frontendUrl -UseBasicParsing -TimeoutSec 30
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "✅ Frontend is accessible (Status: $($frontendResponse.StatusCode))" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Frontend not accessible: $($_.Exception.Message)" -ForegroundColor Red
}

# Test backend health
try {
    Write-Host "🔧 Testing backend health..." -ForegroundColor White
    $backendResponse = Invoke-RestMethod -Uri "$backendUrl/health" -TimeoutSec 30
    Write-Host "✅ Backend is healthy: $($backendResponse.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test admin page specifically
try {
    Write-Host "👤 Testing admin interface..." -ForegroundColor White
    $adminResponse = Invoke-WebRequest -Uri "$frontendUrl/admin/activities/new" -UseBasicParsing -TimeoutSec 30
    if ($adminResponse.StatusCode -eq 200) {
        Write-Host "✅ Admin interface is accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Admin interface not accessible: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== NEXT STEPS ===" -ForegroundColor Cyan
Write-Host "1. Open: $frontendUrl/admin/activities/new" -ForegroundColor White
Write-Host "2. Try uploading images to test the fix" -ForegroundColor White
Write-Host "3. Verify no CORS errors in browser console" -ForegroundColor White
Write-Host "4. Check that images upload successfully" -ForegroundColor White
Write-Host ""
Write-Host "=== VERIFICATION COMPLETE ===" -ForegroundColor Cyan
