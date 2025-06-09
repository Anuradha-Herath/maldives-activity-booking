# Frontend-only deployment script
# This script deploys only the frontend with temporary fixes

#!/bin/bash

echo "=== MALDIVES ACTIVITY BOOKING - FRONTEND DEPLOYMENT SCRIPT ==="

# Navigate to project directory
echo "==> Running from: $(pwd)"

# Check git status
echo "==> Git status:"
git status

# Commit changes
echo "==> Committing frontend fixes..."
git add client/vite.config.js client/.env.production
git commit -m "Temporary fix: Revert to old API routes until backend is updated"

# Push to repository
echo "==> Pushing to repository..."
git push origin main

echo "==> Frontend deployment process initiated!"
echo "==> Go to Render dashboard to monitor the deployment:"
echo "    https://dashboard.render.com"
echo "==> When deployment completes, test the frontend at:"
echo "    https://maldives-activity-booking-frontend.onrender.com"
echo "=== DEPLOYMENT SCRIPT COMPLETE ==="
