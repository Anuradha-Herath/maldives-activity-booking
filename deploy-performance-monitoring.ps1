# PowerShell script to deploy performance monitoring features

Write-Host "=== MALDIVES ACTIVITY BOOKING - PERFORMANCE MONITORING DEPLOYMENT ===" -ForegroundColor Cyan

# Navigate to project directory
$projectRoot = Get-Location
Write-Host "==> Running from: $projectRoot" -ForegroundColor Yellow

# Verify required files exist
Write-Host "==> Checking for required performance monitoring files..." -ForegroundColor Yellow

$filesToCheck = @(
  "client/src/utils/performanceMonitoring.js",
  "performance-monitoring-plan.md",
  "production-verification-checklist.md",
  "user-testing-guide.md"
)

$missingFiles = $false
foreach ($file in $filesToCheck) {
  if (Test-Path $file) {
    Write-Host "✅ $file exists" -ForegroundColor Green
  } else {
    Write-Host "❌ $file is missing!" -ForegroundColor Red
    $missingFiles = $true
  }
}

if ($missingFiles) {
  Write-Host "==> Some files are missing. Please ensure all required files exist before deploying." -ForegroundColor Red
  exit 1
}

# Check Dashboard.jsx for performance monitoring code
Write-Host "==> Checking Dashboard.jsx for performance monitoring integration..." -ForegroundColor Yellow

$dashboardContent = Get-Content "client/src/pages/dashboard/Dashboard.jsx" -Raw
$integrationIssues = $false

if ($dashboardContent -match "useDashboardPerformanceTracking") {
  Write-Host "✅ Performance monitoring hook is integrated in Dashboard.jsx" -ForegroundColor Green
} else {
  Write-Host "❌ Performance monitoring hook is not integrated in Dashboard.jsx!" -ForegroundColor Red
  $integrationIssues = $true
}

if ($dashboardContent -match "markDataLoaded") {
  Write-Host "✅ markDataLoaded function is used in Dashboard.jsx" -ForegroundColor Green
} else {
  Write-Host "❌ markDataLoaded function is not used in Dashboard.jsx!" -ForegroundColor Red
  $integrationIssues = $true
}

if ($dashboardContent -match "logMetric") {
  Write-Host "✅ logMetric function is used in Dashboard.jsx" -ForegroundColor Green
} else {
  Write-Host "❌ logMetric function is not used in Dashboard.jsx!" -ForegroundColor Red
  $integrationIssues = $true
}

if ($integrationIssues) {
  Write-Host "==> Performance monitoring is not fully integrated. Please fix integration issues before deploying." -ForegroundColor Red
  exit 1
}

# Build the project with dashboard fix and performance monitoring
Write-Host "==> Building project with dashboard fix and performance monitoring..." -ForegroundColor Yellow

if (Test-Path "build-with-dashboard-fix.ps1") {
  & ./build-with-dashboard-fix.ps1
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
  }
} else {
  Write-Host "❌ build-with-dashboard-fix.ps1 script not found!" -ForegroundColor Yellow
  Write-Host "==> Attempting standard build process..." -ForegroundColor Yellow
  
  Push-Location client
  npm run build
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    Pop-Location
    exit 1
  }
  Pop-Location
}

# Add new files to git
Write-Host "==> Adding new files to git..." -ForegroundColor Yellow
git add client/src/utils/performanceMonitoring.js
git add performance-monitoring-plan.md
git add production-verification-checklist.md
git add user-testing-guide.md
git add deploy-performance-monitoring.ps1
git add deploy-performance-monitoring.sh

# Commit changes
Write-Host "==> Committing changes..." -ForegroundColor Yellow
git commit -m "Add performance monitoring for dashboard update fix"

# Push to repository
Write-Host "==> Pushing changes to repository..." -ForegroundColor Yellow
git push origin main

Write-Host "==> Performance monitoring deployment process initiated!" -ForegroundColor Green
Write-Host "==> Go to Render dashboard to monitor the deployment:" -ForegroundColor Green
Write-Host "    https://dashboard.render.com" -ForegroundColor Blue
Write-Host "==> When deployment completes, test the frontend at:" -ForegroundColor Green
Write-Host "    https://maldives-activity-booking-frontend.onrender.com" -ForegroundColor Blue
Write-Host "==> Refer to production-verification-checklist.md for final verification steps" -ForegroundColor Green
Write-Host "=== DEPLOYMENT SCRIPT COMPLETE ===" -ForegroundColor Cyan
