# PowerShell production build script with dashboard refresh fix

Write-Host "=== Building Maldives Activity Booking with dashboard refresh fix ===" -ForegroundColor Cyan

# Navigate to client directory
Set-Location -Path .\client

# Install all dependencies
Write-Host "==> Installing dependencies..." -ForegroundColor Yellow
npm install

# Build with special flags to ensure fresh data in production
Write-Host "==> Building for production with dashboard refresh fix..." -ForegroundColor Yellow
$env:VITE_ENABLE_DASHBOARD_FIX = "true"
$env:VITE_CACHE_BUSTER = "true"
npm run build

Write-Host "==> Copying service worker to dist directory..." -ForegroundColor Yellow
Copy-Item -Path .\public\cache-buster-sw.js -Destination .\dist\

Write-Host "==> Creating cache control headers..." -ForegroundColor Yellow
@"
/*
  Cache-Control: no-cache, no-store, must-revalidate

/api/*
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0
"@ | Out-File -FilePath .\dist\_headers -Encoding utf8

Write-Host "==> Build complete!" -ForegroundColor Green
Write-Host "==> Deploy the contents of the dist directory to your hosting provider" -ForegroundColor Green
