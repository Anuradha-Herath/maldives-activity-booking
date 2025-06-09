# Fix Authentication Issues in Deployed Environment
# Run this script to apply all fixes and verify authentication

Write-Host "`n🛠️ Authentication Fix Tool" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan

# Check if node is installed
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js detected: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ Node.js not found. Please install Node.js before running this script." -ForegroundColor Red
    exit 1
}

# Default URLs - change these to match your deployment
$BACKEND_URL = "https://maldives-activity-booking-backend.onrender.com"
$FRONTEND_URL = "https://maldives-activities.netlify.app"

# Ask for custom URLs if needed
Write-Host "`nCurrent deployment URLs:"
Write-Host "- Backend: $BACKEND_URL" -ForegroundColor Cyan
Write-Host "- Frontend: $FRONTEND_URL" -ForegroundColor Cyan

$changeUrls = Read-Host "`nDo you want to change these URLs? (y/N)"
if ($changeUrls -eq "y" -or $changeUrls -eq "Y") {
    $BACKEND_URL = Read-Host "Enter backend URL (e.g., https://your-backend.onrender.com)"
    $FRONTEND_URL = Read-Host "Enter frontend URL (e.g., https://your-frontend.netlify.app)"
}

# Fix backend deployment issues
Write-Host "`n📝 Fixing backend deployment issues..." -ForegroundColor Yellow
try {
    node fix-backend-deployment.js
}
catch {
    Write-Host "❌ Error running backend fix script: $_" -ForegroundColor Red
}

# Fix frontend environment variables
Write-Host "`n📝 Fixing frontend environment variables..." -ForegroundColor Yellow
try {
    Set-Location -Path "client"
    node fix-env-vars.js
    Set-Location -Path ".."
}
catch {
    Write-Host "❌ Error running frontend fix script: $_" -ForegroundColor Red
    Set-Location -Path ".."
}

# Verify authentication
Write-Host "`n📋 Verifying authentication configuration..." -ForegroundColor Yellow
try {
    npm install axios --no-save
    node verify-auth-deployment.js $BACKEND_URL $FRONTEND_URL
}
catch {
    Write-Host "❌ Error running verification script: $_" -ForegroundColor Red
}

# Instructions for redeployment
Write-Host "`n🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Redeploy your backend server with the updated configuration"
Write-Host "2. Redeploy your frontend with the fixed environment variables"
Write-Host "3. Wait 2-3 minutes for changes to propagate"
Write-Host "4. Test login/signup on your deployed site"
Write-Host "`n📋 Additional Resources:" -ForegroundColor Cyan
Write-Host "- API diagnostic page: $FRONTEND_URL/api-connection-test.html"
Write-Host "- Authentication status: $BACKEND_URL/api/v1/auth/status"
Write-Host "- Check browser console for detailed error messages"

Write-Host "`n✅ Fix script completed!" -ForegroundColor Green
