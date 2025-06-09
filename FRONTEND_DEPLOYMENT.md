# 🚀 Frontend Deployment Guide

## Issue: Data Not Loading in Production

### Problem
The frontend works locally but doesn't fetch data when deployed because:
1. Environment variables aren't set correctly in production
2. API URL points to localhost instead of production backend

### Solution

## 📋 **For Netlify Deployment**

### 1. **Set Environment Variables in Netlify Dashboard**
Go to your Netlify site settings → Environment variables and add:

```
VITE_API_URL=https://maldives-activity-booking-backend.onrender.com/api/v1
VITE_CLOUDINARY_CLOUD_NAME=dwzhs42tz
VITE_CLOUDINARY_UPLOAD_PRESET=maldives_activities
```

### 2. **Build Settings in Netlify**
```
Build command: npm run build
Publish directory: dist
```

### 3. **Deploy from Git**
- Connect your repository
- Netlify will automatically deploy when you push to main branch

## 📋 **For Vercel Deployment**

### 1. **Set Environment Variables in Vercel Dashboard**
Go to your Vercel project settings → Environment Variables:

```
VITE_API_URL=https://maldives-activity-booking-backend.onrender.com/api/v1
VITE_CLOUDINARY_CLOUD_NAME=dwzhs42tz
VITE_CLOUDINARY_UPLOAD_PRESET=maldives_activities
```

### 2. **Build Settings**
Vercel automatically detects Vite projects. No configuration needed.

## 📋 **For Render Static Site**

### 1. **Environment Variables in Render**
```
VITE_API_URL=https://maldives-activity-booking-backend.onrender.com/api/v1
VITE_CLOUDINARY_CLOUD_NAME=dwzhs42tz
VITE_CLOUDINARY_UPLOAD_PRESET=maldives_activities
```

### 2. **Build Settings**
```
Build Command: npm install && npm run build
Publish Directory: dist
```

## 🔧 **Manual Build and Deploy**

If you want to build locally and deploy manually:

1. **Set production environment variables locally:**
```bash
# Create .env.local file with production values
VITE_API_URL=https://maldives-activity-booking-backend.onrender.com/api/v1
VITE_CLOUDINARY_CLOUD_NAME=dwzhs42tz
VITE_CLOUDINARY_UPLOAD_PRESET=maldives_activities
```

2. **Build for production:**
```bash
npm run build
```

3. **Deploy the `dist` folder** to your hosting platform

## ⚠️ **Important Notes**

### **Backend URL**
Make sure your backend is deployed first and the URL is correct:
- Backend should be: `https://maldives-activity-booking-backend.onrender.com`
- API endpoint: `https://maldives-activity-booking-backend.onrender.com/api/v1`

### **CORS Configuration**
Ensure your backend CORS includes your frontend domain:
```env
CORS_ORIGIN=https://your-frontend-domain.netlify.app,https://maldives-activity-booking-frontend.onrender.com
```

### **Testing Deployment**
After deployment, check browser console for:
1. No CORS errors
2. API calls going to correct URL
3. Environment variables loaded correctly

## 🐛 **Troubleshooting**

### **Activities Not Loading**
1. Check browser network tab - are API calls going to correct URL?
2. Check console for CORS errors
3. Verify backend is deployed and accessible
4. Confirm environment variables are set in deployment platform

### **Build Errors**
1. Ensure all dependencies are in package.json
2. Check for TypeScript or ESLint errors
3. Verify environment variables don't contain sensitive data

### **Runtime Errors**
1. Check browser console for JavaScript errors
2. Verify API responses in network tab
3. Test API endpoints directly in browser
