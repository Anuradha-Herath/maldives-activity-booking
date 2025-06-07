$ErrorActionPreference = "Stop"

Write-Host "🚀 Maldives Activity Booking API Test Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Define URLs
$backendUrl = "https://maldives-activity-booking-backend.onrender.com/api/v1/server-status"
$activitiesUrl = "https://maldives-activity-booking-backend.onrender.com/api/v1/activities"

function Test-ApiEndpoint {
    param (
        [string]$Name,
        [string]$Url
    )
    
    Write-Host "`nTesting $Name..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-RestMethod -Uri $Url -Method Get -TimeoutSec 30
        Write-Host "✅ Success! Received response from $Url" -ForegroundColor Green
        Write-Host "Response:" -ForegroundColor Cyan
        $response | ConvertTo-Json -Depth 2 | Write-Host
        return $true
    }
    catch {
        Write-Host "❌ Error connecting to $Url" -ForegroundColor Red
        Write-Host "Error details: $_" -ForegroundColor Red
        return $false
    }
}

Write-Host "`n📡 Step 1: Testing Backend API Status" -ForegroundColor Cyan
Write-Host "------------------------------------" -ForegroundColor Cyan
$statusOk = Test-ApiEndpoint -Name "Backend Status" -Url $backendUrl

if ($statusOk) {
    Write-Host "`n📡 Step 2: Testing Activities Endpoint" -ForegroundColor Cyan
    Write-Host "------------------------------------" -ForegroundColor Cyan
    $activitiesOk = Test-ApiEndpoint -Name "Activities API" -Url $activitiesUrl
    
    if ($activitiesOk) {
        Write-Host "`n✅ All API tests passed!" -ForegroundColor Green
    }
    else {
        Write-Host "`n⚠️ Activities endpoint test failed but server is running." -ForegroundColor Yellow
        Write-Host "This might indicate an issue with the activities route or database connection." -ForegroundColor Yellow
    }
}
else {
    Write-Host "`n❌ Backend API is not responding. Check if the server is running." -ForegroundColor Red
}

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "API test completed!" -ForegroundColor Cyan

# Wait for user input before closing
Write-Host "`nPress Enter to exit..." -ForegroundColor Gray
Read-Host
