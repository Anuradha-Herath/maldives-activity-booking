# Authentication Troubleshooting Guide

This guide provides step-by-step instructions for diagnosing and fixing authentication issues in your Maldives Activity Booking application deployment.

## Quick Fix

For an automated fix, run the PowerShell script:

```powershell
./fix-authentication.ps1
```

Or run these commands separately:

```powershell
# Fix backend issues
node fix-backend-deployment.js

# Fix frontend environment variables
cd client
node fix-env-vars.js
cd ..

# Verify authentication
node verify-auth-deployment.js
```

## Common Authentication Issues

### 1. CORS Errors

**Symptoms:**
- Browser console shows CORS errors
- Login/register requests fail with "Access-Control-Allow-Origin" errors
- Credentials not being included in requests

**Fixes:**
- Update the `CORS_ORIGIN` environment variable in your backend to include your frontend URL
- Ensure CORS is configured with `credentials: true`
- Set SameSite cookie attribute to 'none' for cross-site requests

### 2. Cookie Issues

**Symptoms:**
- Authentication token is sent but user isn't remembered across page refreshes
- Browser console shows cookie-related warnings

**Fixes:**
- Ensure cookies are set with correct attributes:
  - `secure: true` in production
  - `sameSite: 'none'` for cross-origin requests
  - `httpOnly: true` for security
  - `path: '/'` to make the cookie available across the site

### 3. Environment Variable Issues

**Symptoms:**
- API requests are sent to wrong URLs
- Environment variables include their names (e.g., `VITE_API_URL=VITE_API_URL=value`)
- Backend can't parse frontend requests

**Fixes:**
- Ensure `.env.production` contains the correct API URL without the variable name
- Fix the format of all environment variables
- Set `VITE_API_URL` to the full backend API path including `/api/v1`

### 4. JWT Token Issues

**Symptoms:**
- Authentication works momentarily but user gets logged out quickly
- Protected API calls fail with 401 errors

**Fixes:**
- Check that JWT_SECRET is properly set in backend environment
- Ensure JWT_EXPIRE and JWT_COOKIE_EXPIRE are set to reasonable values (e.g., 30d and 30)
- Verify tokens are being stored in localStorage and included in Authorization headers

## Step-by-Step Diagnosis

### Step 1: Check API Connectivity

Use the API diagnostic page to check basic connectivity:
```
https://your-frontend-url.com/api-connection-test.html
```

### Step 2: Check Server Authentication Status

Visit the auth status endpoint to verify server configuration:
```
https://your-backend-url.com/api/v1/auth/status
```

### Step 3: Examine Browser Console

1. Open your deployed application
2. Open browser developer tools (F12)
3. Navigate to the Console tab
4. Try to log in or sign up
5. Look for error messages related to:
   - CORS issues
   - Network request failures
   - Authentication errors

### Step 4: Check Server Logs

If you have access to backend logs, look for:
- Registration and login attempts
- CORS errors
- Cookie configuration messages

## Detailed Solutions

### CORS Configuration Fix

The backend server needs to allow requests from your frontend domain:

```javascript
// In server.js
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // During deployment debugging, allow all origins
    return callback(null, true);
    
    // For production use when everything is working:
    /*
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy does not allow this origin'), false);
    }
    return callback(null, true);
    */
  },
  credentials: true // Critical for cookies to work
}));
```

### Cookie Settings Fix

Update cookie settings for cross-origin authentication:

```javascript
// In auth.controller.js (sendTokenResponse function)
const options = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
  path: '/', // Make available across the site
};

// Apply settings for production
if (process.env.NODE_ENV === 'production') {
  options.secure = true;
  options.sameSite = 'none'; // Required for cross-site cookies
}
```

### Environment Variables Fix

Create or update `.env.production` in your frontend:

```
# .env.production
VITE_API_URL=https://your-backend-url.com/api/v1
```

Update server environment variables:

```
# server/.env
JWT_SECRET=your-secure-secret-key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
CORS_ORIGIN=https://your-frontend-url.com
```

## Verify Your Fix

After applying all fixes:

1. Redeploy your backend and frontend applications
2. Run the verification script:
   ```powershell
   node verify-auth-deployment.js https://your-backend-url.com https://your-frontend-url.com
   ```
3. Test login and sign-up functionality manually
4. Confirm user stays logged in after page refreshes

## Need More Help?

If issues persist after following this guide:

1. Check for platform-specific deployment requirements
2. Verify all environment variables are correctly set in your deployment platform
3. Test with a local backend and deployed frontend to isolate the issue
4. Consider temporarily disabling strict security settings for debugging

Remember to revert any debugging-specific changes (like allowing all origins) once authentication is working properly.
