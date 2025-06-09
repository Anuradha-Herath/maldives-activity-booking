# Authentication Deployment Fix Checklist

## How to Fix Authentication Issues in Deployed Environment

Follow this step-by-step checklist to resolve authentication issues in your deployed Maldives Activity Booking application.

### Step 1: Verify API URLs are Correct

- [ ] **Backend URL**: Ensure your backend is deployed and accessible at the correct URL
  - Current expected URL: `https://maldives-activity-booking-backend.onrender.com`
  - Test with: `curl https://maldives-activity-booking-backend.onrender.com/api/v1`

- [ ] **Frontend URL**: Verify your frontend deployment URL 
  - Common URLs: 
    - Netlify: `https://maldives-activities.netlify.app`
    - Vercel: `https://maldives-activities.vercel.app`
    - Render: `https://maldives-activity-booking-frontend.onrender.com`

### Step 2: Update Environment Variables

- [ ] **Frontend Environment Variables**: Set up properly in your deployment platform
  ```
  VITE_API_URL=https://maldives-activity-booking-backend.onrender.com/api/v1
  ```

- [ ] **Backend Environment Variables**: Make sure these are set in your backend deployment
  ```
  CORS_ORIGIN=https://maldives-activities.netlify.app,https://maldives-activities.vercel.app,https://maldives-activity-booking-frontend.onrender.com
  JWT_SECRET=your_secret_key
  JWT_EXPIRE=30d
  JWT_COOKIE_EXPIRE=30
  ```

### Step 3: Fix CORS Configuration

- [ ] **Check Allowed Origins**: Make sure your backend's CORS configuration includes your frontend URL
  - Open `server/server.js` and verify the `allowedOrigins` array includes your frontend URL
  - If not, add it and redeploy

- [ ] **Enable Credentials**: Ensure `credentials: true` is set in CORS options

- [ ] **Verify CORS Headers**:
  - `Access-Control-Allow-Origin` should match your frontend origin or use wildcard during testing
  - `Access-Control-Allow-Credentials` should be `true`
  - `Access-Control-Allow-Methods` should include `GET, POST, PUT, DELETE`

### Step 4: Fix Cookie Settings

- [ ] **Cookie Options**: Update cookie settings in `auth.controller.js`:
  ```javascript
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Must be true in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Must be 'none' for cross-site cookies
  };
  ```

### Step 5: Diagnose Issues

- [ ] **Run Auth Test Script**: Execute `node auth-test.js` to test your API endpoints
- [ ] **Check Browser Console**: Look for CORS errors, network failures, or 401 Unauthorized errors
- [ ] **Use API Connection Test**: Open the `api-connection-test.html` in your browser to test connectivity
- [ ] **Check Network Requests**: Use browser developer tools to examine authentication request/response

### Step 6: Apply Fixes

- [ ] **Run the Fix Script**: Execute `node fix-auth-deployment.js` to apply common fixes automatically
- [ ] **Rebuild & Redeploy**: After making changes, rebuild and redeploy both frontend and backend
- [ ] **Clear Browser Data**: Clear cookies, localStorage and browser cache before testing again
- [ ] **Test Authentication**: Try logging in with known credentials to verify fixes

### Step 7: Additional Troubleshooting

- [ ] **HTTPS Required**: Ensure both frontend and backend use HTTPS for secure cookie transmission
- [ ] **JWT Token**: Check that JWT token is correctly sent in the Authorization header
- [ ] **Backend Logs**: Review server logs for authentication errors
- [ ] **Frontend Logging**: Add extra `console.log` statements to track authentication flow

## Advanced Fixes

If the above steps don't resolve your authentication issues, consider these advanced fixes:

1. **Implement Token-Only Authentication**: If cookie-based auth continues to fail, modify the code to use only JWT token authentication via localStorage

2. **Use Proxy in Development**: Add a proxy in development to avoid CORS issues:
   ```javascript
   // vite.config.js
   export default {
     server: {
       proxy: {
         '/api': 'https://maldives-activity-booking-backend.onrender.com'
       }
     }
   }
   ```

3. **Try Alternative Authentication Method**: Implement a simple API key for testing or OAuth for more robust authentication

4. **Implement Custom Error Handling**: Add detailed error logging in both frontend and backend to better identify issues

## Need More Help?

If you're still experiencing issues after following this checklist, you may need to:

1. Check if your hosting platform has specific CORS or cookie restrictions
2. Verify network connectivity between frontend and backend
3. Test with a simple API endpoint to isolate authentication-specific problems

Remember to restart your servers after making configuration changes!
