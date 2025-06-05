# Deployment Guide for Maldives Activity Booking Website

## Overview
This document guides you through deploying the Maldives Activity Booking website:
- Frontend: Deployed on Vercel
- Backend: Deployed on Railway

## Prerequisites
- Vercel account
- Railway account
- GitHub repository with your code

## Frontend Deployment (Vercel)

### Step 1: Prepare your frontend code
1. Make sure your environment variables are properly set up
2. Ensure your API connection points to the production backend URL
3. Make sure you have the correct Cloudinary credentials

### Step 2: Deploy to Vercel
1. Go to https://vercel.com/ and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add the following environment variables:
   ```
   REACT_APP_API_URL=https://maldives-activity-booking-production.up.railway.app/api/v1
   REACT_APP_CLOUDINARY_CLOUD_NAME=dwzhs42tz
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=maldives_activities
   ```
6. Click "Deploy"

### Step 3: Verify the frontend deployment
1. Once the deployment is complete, Vercel will provide a URL
2. Visit the URL to make sure your site is accessible
3. Visit the `/test-connection` route to verify API connectivity

## Backend Deployment (Railway)

### Step 1: Prepare your backend code
1. Make sure your CORS settings include the Vercel frontend domain
2. Set up your MongoDB and Cloudinary credentials correctly

### Step 2: Deploy to Railway
1. Go to https://railway.app/ and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Import your GitHub repository
4. Configure the deployment:
   - Root Directory: `server`
   - Start Command: `npm start`
5. Add the following environment variables (use the same values from your local .env file):
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret-key
   CLOUDINARY_CLOUD_NAME=dwzhs42tz
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   CLOUDINARY_UPLOAD_PRESET=maldives_activities
   CORS_ORIGIN=https://your-vercel-domain.vercel.app,http://localhost:5173,http://localhost:3000
   ```
6. Deploy the project

### Step 3: Verify the backend deployment
1. Once deployed, Railway will provide a domain for your API
2. Test the API by accessing a public endpoint: `https://your-railway-domain.up.railway.app/api/v1/activities`
3. Or use the debug endpoint: `https://your-railway-domain.up.railway.app/api/v1/debug/connection`

## Troubleshooting

### Frontend can't connect to backend
1. Check your environment variables in Vercel
2. Visit `/test-connection` on your frontend to diagnose API connection issues
3. Make sure CORS is properly configured on your backend
4. Check the browser console for network errors

### Backend deployment issues
1. Check your MongoDB connection string
2. Verify all environment variables are correctly set in Railway
3. Check the Railway logs for any errors
4. Make sure your package.json has the correct start script

### CORS errors
If you see CORS errors in the browser console:
1. Update the CORS_ORIGIN environment variable in Railway to include your Vercel domain
2. Make sure the backend is correctly parsing and applying the CORS settings

## Redeployment Process

### Frontend (Vercel)
1. Push changes to your GitHub repository
2. Vercel will automatically deploy the changes

### Backend (Railway)
1. Push changes to your GitHub repository
2. Railway will automatically deploy the changes

## Testing End-to-End Flow
After deployment, test the complete flow:
1. User registration and login
2. Browsing activities
3. Making a booking
4. Checking booking history
5. Admin functions (if applicable)

## Monitoring
- Use the Railway dashboard to monitor backend performance
- Use Vercel Analytics to monitor frontend performance
