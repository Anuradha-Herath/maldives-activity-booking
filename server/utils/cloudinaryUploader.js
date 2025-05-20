const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Helper to upload a file to Cloudinary
const uploadToCloudinary = async (filePath, options = {}) => {
  try {
    // Set default options
    const uploadOptions = {
      folder: 'maldives_activities',
      use_filename: true,
      unique_filename: true,
      ...options
    };

    // Upload the file
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);
    
    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = { uploadToCloudinary };
