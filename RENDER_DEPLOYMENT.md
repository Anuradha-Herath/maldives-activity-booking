# Deploying to Render.com

This guide will help you deploy your Maldives Activity Booking application to Render.com.

## Prerequisites

1. A Render.com account
2. Your project pushed to a Git repository (GitHub, GitLab, etc.)

## Deployment Steps

### Option 1: Using the Render Blueprint (Recommended)

1. Push your code to a GitHub/GitLab repository
2. Log in to your Render.com account
3. Click on "New" and select "Blueprint"
4. Connect your repository
5. Render will automatically detect the `render.yaml` file and configure your services

### Option 2: Manual Deployment

#### Backend Deployment

1. Log in to your Render.com account
2. Click on "New" and select "Web Service"
3. Connect your Git repository
4. Configure the following settings:
   - **Name**: `maldives-activity-booking-api`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free (or choose a paid plan)

5. Add the following environment variables:
   ```
   NODE_ENV=production
   PORT=10000
   DB_URI=your_mongodb_uri
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   CLOUDINARY_CLOUD_NAME=dwzhs42tz
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_UPLOAD_PRESET=maldives_activities
   CORS_ORIGIN=https://maldives-activity-booking-client.onrender.com,http://localhost:3000,http://localhost:3001,http://localhost:5173
   ```

6. Click "Create Web Service"

#### Frontend Deployment

1. Log in to your Render.com account
2. Click on "New" and select "Static Site"
3. Connect your Git repository
4. Configure the following settings:
   - **Name**: `maldives-activity-booking-client`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`
   - **Plan**: Free (or choose a paid plan)

5. Add the following environment variables:
   ```
   VITE_API_URL=https://maldives-activity-booking-backend.onrender.com/api/v1
   VITE_CLOUDINARY_CLOUD_NAME=dwzhs42tz
   VITE_CLOUDINARY_UPLOAD_PRESET=maldives_activities
   ```

6. Click "Create Static Site"

## Post-Deployment

1. Once deployed, go to the backend service settings and copy the URL (e.g., `https://maldives-activity-booking-backend.onrender.com`)
2. Update the frontend environment variable `REACT_APP_API_URL` to point to this URL with `/api/v1` appended

3. If needed, update the CORS settings in the backend to include any additional frontend URLs

## Troubleshooting

If you encounter issues with your deployment:

1. Check the Render logs for both the backend and frontend services
2. Ensure your environment variables are correctly set
3. Make sure your MongoDB connection string is correct and the database is accessible
4. Verify that the Cloudinary credentials are correct

## Important Notes

- The free tier of Render will put your services to sleep after periods of inactivity, which may cause a slight delay when users first access your application
- Consider upgrading to a paid plan for production use with consistent traffic
