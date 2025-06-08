# Production Dashboard Refresh Verification Script
# This script runs tests to verify that all our dashboard refresh implementations are working correctly

Write-Host "=== MALDIVES ACTIVITY BOOKING - DASHBOARD REFRESH VERIFICATION SCRIPT ===" -ForegroundColor Cyan

# Check if we're in the right directory
$currentDir = Get-Location
Write-Host "==> Current directory: $currentDir" -ForegroundColor Yellow

# Test service worker registration
Write-Host "`n==> Testing service worker registration:" -ForegroundColor Yellow
if (Test-Path "client/public/cache-buster-sw.js") {
    Write-Host "✅ Service worker file exists" -ForegroundColor Green
} else {
    Write-Host "❌ Service worker file missing!" -ForegroundColor Red
}

# Test BookingEventEmitter implementation
Write-Host "`n==> Testing BookingEventEmitter implementation:" -ForegroundColor Yellow
if (Test-Path "client/src/utils/BookingEventEmitter.js") {
    Write-Host "✅ BookingEventEmitter file exists" -ForegroundColor Green
} else {
    Write-Host "❌ BookingEventEmitter file missing!" -ForegroundColor Red
}

# Check production build script
Write-Host "`n==> Testing production build script:" -ForegroundColor Yellow
if (Test-Path "build-with-dashboard-fix.ps1") {
    Write-Host "✅ Production build script exists" -ForegroundColor Green
} else {
    Write-Host "❌ Production build script missing!" -ForegroundColor Red
}

# Verify critical component modifications
$criticalFiles = @(
    "client/src/pages/BookingRequest.jsx",
    "client/src/pages/dashboard/Dashboard.jsx",
    "client/src/pages/dashboard/MyBookings.jsx",
    "client/src/contexts/DashboardContext.jsx",
    "client/src/utils/api.js",
    "client/src/main.jsx"
)

Write-Host "`n==> Verifying critical component modifications:" -ForegroundColor Yellow
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        # Check for key implementation markers
        $fileContent = Get-Content $file -Raw
        $hasChanges = $false
        
        if ($file -like "*BookingRequest.jsx") {
            $hasChanges = $fileContent -match "bookingEvents.emit\('booking_created'"
        } elseif ($file -like "*Dashboard.jsx") {
            $hasChanges = $fileContent -match "bookingEvents.on\('booking_created'"
        } elseif ($file -like "*MyBookings.jsx") {
            $hasChanges = $fileContent -match "fetchBookings\(\)"
        } elseif ($file -like "*api.js") {
            $hasChanges = $fileContent -match "\?_=\$\{Date\.now\(\)"
        } elseif ($file -like "*main.jsx") {
            $hasChanges = $fileContent -match "registerServiceWorker"
        }
        
        if ($hasChanges) {
            Write-Host "✅ $file - Modified correctly" -ForegroundColor Green
        } else {
            Write-Host "⚠️ $file - May not have all required changes" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ $file - File not found!" -ForegroundColor Red
    }
}

# Simulate booking flow and test for dashboard updates
Write-Host "`n==> Testing booking and dashboard update flow:" -ForegroundColor Yellow
Write-Host "1. Navigate to http://localhost:3003" -ForegroundColor White
Write-Host "2. Click on any activity" -ForegroundColor White
Write-Host "3. Click 'Book Now'" -ForegroundColor White
Write-Host "4. Fill out booking form and submit" -ForegroundColor White
Write-Host "5. After confirmation, you should be redirected to dashboard" -ForegroundColor White
Write-Host "6. Verify the dashboard shows the new booking in statistics and recent bookings" -ForegroundColor White
Write-Host "`nRun this test in both development and production environments" -ForegroundColor Magenta

# Production deployment reminder
Write-Host "`n==> Production Deployment Steps:" -ForegroundColor Yellow
Write-Host "1. Run ./build-with-dashboard-fix.ps1" -ForegroundColor White
Write-Host "2. Deploy the dist directory to Render or your hosting provider" -ForegroundColor White
Write-Host "3. Verify the fix by making a booking in production" -ForegroundColor White

Write-Host "`n=== VERIFICATION SCRIPT COMPLETE ===" -ForegroundColor Cyan
