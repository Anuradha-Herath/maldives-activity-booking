#!/bin/bash
# Performance Monitoring Deployment Script

echo "=== MALDIVES ACTIVITY BOOKING - PERFORMANCE MONITORING DEPLOYMENT ==="
echo "==> This script deploys the performance monitoring features to production"

# Navigate to project directory (if script is run from project root, this is a no-op)
cd "$(dirname "$0")" || { echo "Failed to navigate to script directory"; exit 1; }
echo "==> Running from: $(pwd)"

# Verify required files exist
echo "==> Checking for required performance monitoring files..."

FILES_TO_CHECK=(
  "client/src/utils/performanceMonitoring.js"
  "performance-monitoring-plan.md"
  "production-verification-checklist.md"
  "user-testing-guide.md"
)

for file in "${FILES_TO_CHECK[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file is missing!"
    MISSING_FILES=true
  fi
done

if [ "$MISSING_FILES" = true ]; then
  echo "==> Some files are missing. Please ensure all required files exist before deploying."
  exit 1
fi

# Check Dashboard.jsx for performance monitoring code
echo "==> Checking Dashboard.jsx for performance monitoring integration..."
if grep -q "useDashboardPerformanceTracking" "client/src/pages/dashboard/Dashboard.jsx"; then
  echo "✅ Performance monitoring hook is integrated in Dashboard.jsx"
else
  echo "❌ Performance monitoring hook is not integrated in Dashboard.jsx!"
  INTEGRATION_ISSUES=true
fi

if grep -q "markDataLoaded" "client/src/pages/dashboard/Dashboard.jsx"; then
  echo "✅ markDataLoaded function is used in Dashboard.jsx"
else
  echo "❌ markDataLoaded function is not used in Dashboard.jsx!"
  INTEGRATION_ISSUES=true
fi

if grep -q "logMetric" "client/src/pages/dashboard/Dashboard.jsx"; then
  echo "✅ logMetric function is used in Dashboard.jsx"
else
  echo "❌ logMetric function is not used in Dashboard.jsx!"
  INTEGRATION_ISSUES=true
fi

if [ "$INTEGRATION_ISSUES" = true ]; then
  echo "==> Performance monitoring is not fully integrated. Please fix integration issues before deploying."
  exit 1
fi

# Build the project with dashboard fix and performance monitoring
echo "==> Building project with dashboard fix and performance monitoring..."
if [ -f "build-with-dashboard-fix.sh" ]; then
  bash build-with-dashboard-fix.sh || { echo "Build failed!"; exit 1; }
else
  echo "❌ build-with-dashboard-fix.sh script not found!"
  echo "==> Attempting standard build process..."
  cd client && npm run build || { echo "Build failed!"; exit 1; }
  cd ..
fi

# Add new files to git
echo "==> Adding new files to git..."
git add client/src/utils/performanceMonitoring.js
git add performance-monitoring-plan.md
git add production-verification-checklist.md
git add user-testing-guide.md
git add deploy-performance-monitoring.sh

# Commit changes
echo "==> Committing changes..."
git commit -m "Add performance monitoring for dashboard update fix"

# Push to repository
echo "==> Pushing changes to repository..."
git push origin main

echo "==> Performance monitoring deployment process initiated!"
echo "==> Go to Render dashboard to monitor the deployment:"
echo "    https://dashboard.render.com"
echo "==> When deployment completes, test the frontend at:"
echo "    https://maldives-activity-booking-frontend.onrender.com"
echo "==> Refer to production-verification-checklist.md for final verification steps"
echo "=== DEPLOYMENT SCRIPT COMPLETE ==="
