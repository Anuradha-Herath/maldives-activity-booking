const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Upload image to Cloudinary
// @route   POST /api/v1/upload
// @access  Private
exports.uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        error: 'No files were uploaded'
      });
    }

    // Get the uploaded file
    const file = req.files.file;
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Create a unique filename
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const filePath = path.join(uploadDir, fileName);
    
    console.log('Moving file to:', filePath);
    
    // Move the file to the temporary location
    await file.mv(filePath);
    
    console.log('File moved successfully, uploading to Cloudinary');
    
    // Upload the file to Cloudinary
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'maldives_activities',
        use_filename: true,
        unique_filename: true
      });
      
      console.log('Cloudinary upload successful:', result.secure_url);
      
      // Remove the temporary file
      fs.unlinkSync(filePath);
      
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
        fs.unlinkSync(filePath);
      }
      
      return res.status(500).json({
        success: false,
        error: `Cloudinary upload failed: ${cloudinaryError.message}`
      });
    }
  } catch (error) {
    console.error('Server error during upload:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error during upload: ' + error.message
    });
  }
};
