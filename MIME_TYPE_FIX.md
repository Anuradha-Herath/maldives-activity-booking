# Deployment on Render

## MIME Type Issues

If you encounter MIME type errors such as:

```
Refused to apply style from 'https://maldives-activity-booking-frontend.onrender.com/index.css' because its MIME type ('text/plain') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
```

This is fixed by:

1. Our custom Express server (`server.js`) ensures all CSS files are served with the correct `text/css` MIME type
2. A redirect from `/index.css` to `/assets/css/main.css` is in place
3. The `_headers` file in the build output enforces proper MIME types
4. The build process creates a fallback index.css that imports the main CSS file

## Deployment Process

1. Frontend and backend are deployed as separate services on Render
2. The frontend uses a custom Express server to serve static files with proper MIME types
3. The backend API is configured with CORS to allow requests from the frontend
4. Environment variables are configured in the Render dashboard

## Build Script

The build script:
- Installs dependencies
- Builds the frontend and backend
- Creates necessary configuration files for proper MIME types
- Sets up proper file headers for Render static hosting

## Debugging

If MIME type issues persist:
1. Check Network tab in DevTools to see Content-Type headers
2. Verify the build process correctly created all necessary files
3. Ensure Render is using the correct start command for the Node.js server
