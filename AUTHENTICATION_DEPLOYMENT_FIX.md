# Authentication Deployment Checklist

## Common Issues & Solutions for Authentication After Deployment

### 1. Environment Variables
- [ ] Backend has proper `.env` file in production with:
  - [ ] `MONGODB_URI` - MongoDB connection string
  - [ ] `JWT_SECRET` - Secret key for JWT token generation/verification
  - [ ] `JWT_EXPIRE` - Token expiration time (e.g., "30d")
  - [ ] `JWT_COOKIE_EXPIRE` - Cookie expiration in days (e.g., 30)
  - [ ] `CORS_ORIGIN` - List of allowed frontend origins

- [ ] Frontend has proper environment variables:
  - [ ] `VITE_API_URL` - Points to the deployed backend API URL

### 2. CORS Configuration
- [ ] Backend CORS settings allow the frontend domain
- [ ] `credentials: true` is set in CORS options
- [ ] Proper response headers are set:
  - [ ] `Access-Control-Allow-Origin`
  - [ ] `Access-Control-Allow-Methods`
  - [ ] `Access-Control-Allow-Headers`
  - [ ] `Access-Control-Allow-Credentials`

### 3. Database Connection
- [ ] MongoDB connection string is correctly formatted
- [ ] MongoDB connection is established (check server logs)
- [ ] MongoDB user has proper permissions
- [ ] Network access is configured to allow connections from the deployed backend

### 4. API Endpoints
- [ ] Verify backend API endpoints are accessible
- [ ] Check for any proxy configurations in the frontend
- [ ] Test endpoints using a tool like Postman or the auth-diagnostic.js script

### 5. Token & Cookie Handling
- [ ] Frontend correctly stores and sends authentication tokens
- [ ] Backend cookie settings match the deployment environment:
  ```javascript
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Needed for cross-site cookies
  };
  ```

### 6. HTTPS Configuration
- [ ] Production environment uses HTTPS
- [ ] Cookie settings have `secure: true` in production
- [ ] All API requests use HTTPS in production

### 7. Frontend API URL Configuration
- [ ] Frontend uses the correct API URL with environment variables
- [ ] Verify the build process includes environment variables
- [ ] Check the bundled JS file to confirm the correct URL is used

## Quick Diagnostic Steps

1. **Check Backend Logs**
   - Look for connection issues, errors, or failed authentication attempts

2. **Verify API Connectivity**
   - Run the included auth-diagnostic.js tool to test endpoints
   - Use browser developer tools to check for failed API requests

3. **Test Database Connection**
   - Check if new user registrations are reaching the database
   - Verify existing user credentials are working

4. **Debug Token Handling**
   - Check browser localStorage for token storage
   - Verify Authorization headers are being sent correctly

5. **Test CORS Settings**
   - Use a CORS testing tool or browser developer console
   - Look for CORS-related errors in the console

## Common Fixes

1. **Temporarily Allow All Origins (for debugging)**
   ```javascript
   app.use(cors({
     origin: function(origin, callback) {
       return callback(null, true); // Allow all origins temporarily
     },
     credentials: true
   }));
   ```

2. **Fix MongoDB Connection Issues**
   ```javascript
   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     // Increased timeout for slower connections
     serverSelectionTimeoutMS: 10000
   });
   ```

3. **Fix Cookie Settings for Cross-Origin**
   ```javascript
   res.cookie('token', token, {
     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
   });
   ```
