# 🚀 Quick Deployment Commands

## Prerequisites
Ensure you have:
- MongoDB database URI
- Cloudinary API credentials  
- JWT secret key
- GitHub repository ready

## Deploy to Render.com (Recommended)

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. Deploy via Blueprint
1. Go to [render.com](https://render.com)
2. Click "New" → "Blueprint"  
3. Connect GitHub repository
4. Render auto-deploys using `render.yaml`

### 3. Set Environment Variables
In Render dashboard for backend service:
```bash
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/maldives_booking
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/maldives_booking
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 4. Verify Deployment
```bash
node verify-deployment.js
```

## Alternative: Manual Deployment

### Backend (Render Web Service)
```bash
Name: maldives-activity-booking-api
Build: cd server && npm install
Start: cd server && npm start  
```

### Frontend (Render Static Site)
```bash
Name: maldives-activity-booking-frontend
Build: cd client && npm install && npm run build
Publish: client/dist
```

## Deploy to Netlify (Frontend Only)

### Build Settings
```bash
Build command: cd client && npm install && npm run build
Publish directory: client/dist
```

### Environment Variables
```bash
VITE_API_URL=https://maldives-activity-booking-backend.onrender.com/api/v1
VITE_CLOUDINARY_CLOUD_NAME=dwzhs42tz
VITE_CLOUDINARY_UPLOAD_PRESET=maldives_activities
```

## Local Testing Before Deployment
```bash
# Test production build locally
cd client
npm run build
npm run preview

# Test backend
cd server  
npm start
```

## Verification Steps
1. **Backend API**: Visit `/api/v1/activities`
2. **Frontend**: Check homepage loads activities
3. **CORS**: Ensure no console errors
4. **Mobile**: Test responsive design

## Expected URLs
- Backend: `https://maldives-activity-booking-backend.onrender.com`
- Frontend: `https://maldives-activity-booking-frontend.onrender.com`

## Troubleshooting
- **Build fails**: Check Node.js version compatibility
- **CORS errors**: Verify frontend URL in backend CORS_ORIGIN
- **API errors**: Check environment variables are set
- **Database issues**: Verify MongoDB URI and network access

---
**Total deployment time**: ~10-15 minutes  
**Free tier compatible**: ✅ Yes
