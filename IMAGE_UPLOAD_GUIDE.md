# Image Upload Functionality Guide

This document explains how the image upload functionality works in the Maldives Activity Booking system and how to troubleshoot common issues.

## Overview

The system uses Cloudinary for image storage and serving. When users upload images (either main activity images or gallery images), the following steps occur:

1. The frontend sends the image file to the backend API endpoint (`/api/v1/upload`)
2. The backend temporarily stores the image in the `uploads` directory
3. The backend then uploads the image to Cloudinary
4. Once the upload to Cloudinary is successful, the temporary file is deleted
5. The Cloudinary URL is returned to the frontend and saved with the activity

## Required Configuration

For image uploads to work properly, you need to configure the following environment variables:

- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

Add these to your `.env` file in the `server` directory.

## Fallback Mechanism

The system includes a fallback mechanism when Cloudinary uploads fail:

1. If Cloudinary credentials are missing, it uses a placeholder image URL from [picsum.photos](https://picsum.photos/)
2. If a Cloudinary upload fails, it also falls back to a placeholder image
3. The frontend will show a notification when a placeholder is used

This ensures that activities can still be created/updated even when image uploads aren't working properly.

## Common Issues and Solutions

### 1. "Failed to upload gallery images: Request failed with status code 400"

This occurs when:
- The request isn't properly formatted
- No file was sent in the request
- The file size exceeds the limit (10MB)

**Solution:** 
- Check that the form is correctly appending the file with the key 'file'
- Ensure the file size is under 10MB
- Check network tab for more detailed error messages

### 2. Cloudinary Configuration Issues

If images aren't uploading to Cloudinary:

**Solution:**
- Verify Cloudinary credentials are correct in the `.env` file
- Run the Cloudinary test script: `node test-cloudinary.js`
- Check Cloudinary dashboard to ensure your account is active
- Check your upload preset is set to "unsigned" if you're using direct uploads

### 3. CORS Issues

If you see CORS errors when uploading:

**Solution:**
- Ensure the frontend origin is added to the allowed origins list in `server.js`
- Check that the request includes the proper headers
- Try using a direct Cloudinary upload if backend CORS issues persist

## Testing the Upload Functionality

1. Use the upload-test.html file to diagnose upload issues
2. Check server logs for detailed error messages
3. Use the browser dev tools network tab to inspect request/response cycles

## For Developers

The upload code includes several enhancements:
- Retry logic for failed uploads
- Comprehensive error handling
- Fallback to placeholder images
- Detailed logging

When modifying the upload functionality, ensure these features are preserved.

## Related Files

- `server/controllers/uploadController.js` - Backend upload handling
- `client/src/pages/admin/ActivityForm.jsx` - Frontend upload implementation
- `server/test-cloudinary.js` - Cloudinary configuration test script
- `upload-test.html` - Test page for diagnosing upload issues
- `server/routes/upload.routes.js` - API routes for uploads
