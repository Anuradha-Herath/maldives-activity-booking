const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary with either environment variables or fallback values
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dwzhs42tz';
const apiKey = process.env.CLOUDINARY_API_KEY || '';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '';

// Check if we have the minimum configuration needed
const hasCloudinaryConfig = cloudName && apiKey && apiSecret;

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

// Log configuration status
console.log(`Cloudinary configuration status: ${hasCloudinaryConfig ? 'OK' : 'MISSING'}`);
if (!hasCloudinaryConfig) {
  console.warn('Warning: Cloudinary configuration is incomplete or missing. Image uploads may fail.');
}

// @desc    Upload image to Cloudinary
// @route   POST /api/v1/upload
// @access  Private
exports.uploadImage = async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('Request files:', req.files ? Object.keys(req.files) : 'No files');
    console.log('Content-Type:', req.headers['content-type']);
    
    if (!req.files) {
      return res.status(400).json({
        success: false,
        error: 'No files were uploaded - req.files is undefined'
      });
    }
    
    // Check if the file is available
    if (!req.files.file) {
      const availableFiles = Object.keys(req.files);
      return res.status(400).json({
        success: false,
        error: `No file with name 'file' was uploaded. Available files: ${availableFiles.join(', ')}`
      });
    }

    // Get the uploaded file
    const file = req.files.file;
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
      // Validate file type (allow only images)
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        error: `Invalid file type: ${file.mimetype}. Only images are allowed.`
      });
    }
    
    console.log('File details:', { 
      name: file.name, 
      size: file.size, 
      mimetype: file.mimetype 
    });
    
    // Create a unique filename
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const filePath = path.join(uploadDir, fileName);
    
    console.log('Moving file to:', filePath);
    
    try {
      // Move the file to the temporary location
      await file.mv(filePath);
    } catch (moveError) {
      console.error('Error moving file:', moveError);
      return res.status(500).json({
        success: false,
        error: `Error saving uploaded file: ${moveError.message}`
      });
    }
    
    console.log('File moved successfully, uploading to Cloudinary');
      // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary configuration missing');
      
      // Clean up the temporary file
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkError) {
          console.error('Error removing temp file:', unlinkError);
        }
      }
      
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: Cloudinary credentials not configured'
      });
    }
    
    console.log('Cloudinary config present, attempting upload');
      // Check if we have Cloudinary configuration
    if (!hasCloudinaryConfig) {
      console.warn('Attempting upload without complete Cloudinary configuration');
      
      // Instead of failing, return a placeholder URL or a local URL
      // For this demo, we'll return a publicly accessible placeholder image
      const placeholderUrl = `https://picsum.photos/seed/${Date.now()}/800/600`;
      console.log('Using placeholder image URL:', placeholderUrl);
      
      // Clean up the temporary file
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (cleanupError) {
        console.error('Error during file cleanup:', cleanupError);
      }
      
      // Return success with the placeholder URL
      return res.status(200).json({
        success: true,
        data: {
          url: placeholderUrl,
          public_id: `placeholder-${Date.now()}`,
          isPlaceholder: true
        },
        message: 'Using placeholder image due to Cloudinary configuration issues'
      });
    }
    
    // If we have Cloudinary config, try to upload to Cloudinary
    try {
      console.log('Attempting to upload to Cloudinary...');
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'maldives_activities',
        use_filename: true,
        unique_filename: true
      });
      
      console.log('Cloudinary upload successful:', result.secure_url);
      
      // Remove the temporary file
      try {
        fs.unlinkSync(filePath);
      } catch (unlinkError) {
        console.error('Error removing temp file after successful upload:', unlinkError);
        // Continue since the upload was successful
      }
      
      // Return the Cloudinary URL
      return res.status(200).json({
        success: true,
        data: {
          url: result.secure_url,
          public_id: result.public_id
        }
      });
    } catch (cloudinaryError) {
      console.error('Cloudinary upload error:', cloudinaryError);
      
      // Clean up the temporary file
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkError) {
          console.error('Error removing temp file after failed upload:', unlinkError);
        }
      }
      
      // Fallback to placeholder image when Cloudinary fails
      const placeholderUrl = `https://picsum.photos/seed/${Date.now()}/800/600`;
      
      return res.status(200).json({
        success: true,
        data: {
          url: placeholderUrl,
          public_id: `fallback-${Date.now()}`,
          isFallback: true
        },
        warning: `Cloudinary upload failed: ${cloudinaryError.message}. Using fallback image.`
      });
    }} catch (error) {
    console.error('Server error during upload:', error);
    
    // If there was a temporary file created, try to clean it up
    try {
      const uploadDir = path.join(__dirname, '../uploads');
      // Check if the directory exists and has files that might need cleanup
      if (fs.existsSync(uploadDir)) {
        const tempFiles = fs.readdirSync(uploadDir);
        console.log(`Found ${tempFiles.length} temporary files that might need cleanup`);
      }
    } catch (cleanupError) {
      console.error('Error during cleanup attempt:', cleanupError);
    }
    
    return res.status(500).json({
      success: false,
      error: 'Server error during upload: ' + error.message
    });
  }
};
