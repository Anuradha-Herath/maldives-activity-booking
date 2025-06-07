# Test Authentication Flow Script for Maldives Activity Booking

Write-Host "🧪 Running Comprehensive Authentication Test 🧪" -ForegroundColor Cyan

# Check if Node.js is installed
$nodeVersion = node -v
if (-not $?) {
    Write-Host "❌ Node.js is not installed. Please install Node.js to run this script." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Using Node.js $nodeVersion" -ForegroundColor Green

# Check if Axios is installed
$axiosInstalled = npm list axios | Select-String -Pattern "axios"
if (-not $axiosInstalled) {
    Write-Host "Installing axios dependency..." -ForegroundColor Yellow
    npm install axios
    
    if (-not $?) {
        Write-Host "❌ Failed to install axios. Please install it manually with 'npm install axios'" -ForegroundColor Red
        exit 1
    }
}

# Set environment variables
$env:API_URL = "https://maldives-activity-booking-backend.onrender.com/api/v1"
$env:FRONTEND_URL = "https://maldives-activity-booking-frontend.onrender.com"

Write-Host ""
Write-Host "🔍 Running comprehensive authentication test with these settings:" -ForegroundColor Cyan
Write-Host "  API URL: $env:API_URL" -ForegroundColor Magenta
Write-Host "  Frontend URL: $env:FRONTEND_URL" -ForegroundColor Magenta
Write-Host ""

# Run the test script
node comprehensive-auth-test.js

if ($?) {
    Write-Host ""
    Write-Host "✅ Authentication test execution completed" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Authentication test execution failed" -ForegroundColor Red
}

# Clean up environment variables
Remove-Item Env:\API_URL
Remove-Item Env:\FRONTEND_URL
