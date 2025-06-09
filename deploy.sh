#!/bin/bash

echo "=== MALDIVES ACTIVITY BOOKING - DEPLOYMENT SCRIPT ==="

# Navigate to project directory
echo "==> Running from: $(pwd)"

# Check git status
echo "==> Git status:"
git status

# Commit changes
echo "==> Committing changes..."
git add .
git commit -m "Fix: Express duplicate import and API route paths"

# Push to repository
echo "==> Pushing to repository..."
git push origin main

echo "==> Deployment process initiated!"
echo "==> Go to Render dashboard to monitor the deployment:"
echo "    https://dashboard.render.com"
echo "==> When deployment completes, test the API at:"
echo "    https://maldives-activity-booking-backend.onrender.com/api/v1"
echo "=== DEPLOYMENT SCRIPT COMPLETE ==="
