// Debug upload controller for diagnosing file upload issues
const path = require('path');
const fs = require('fs');

// @desc    Debug upload endpoint that only saves locally
// @route   POST /api/v1/debug/upload
exports.debugUpload = async (req, res) => {
  try {
    console.log('Debug upload request received');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files ? Object.keys(req.files) : 'No files');
    console.log('Request headers:', req.headers);
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files were uploaded',
        reqFiles: req.files ? 'Files object exists but is empty' : 'req.files is undefined or null'
      });
    }
    
    // Check if file is found with expected key
    let fileKey = 'file';
    if (!req.files[fileKey]) {
      // Try to find any file in the request
      const availableFiles = Object.keys(req.files);
      if (availableFiles.length > 0) {
        fileKey = availableFiles[0];
        console.log(`File not found with key 'file', using first available key: ${fileKey}`);
      } else {
        return res.status(400).json({
          success: false,
          error: 'No valid file found in the request'
        });
      }
    }
    
    const file = req.files[fileKey];
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Create a unique filename
    const fileName = `debug_${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const filePath = path.join(uploadDir, fileName);
    
    console.log('Moving file to:', filePath);
    
    try {
      // Move the file to the temporary location
      await file.mv(filePath);
      
      // Return success with file info
      return res.status(200).json({
        success: true,
        message: 'File uploaded successfully (debug mode)',
        data: {
          name: file.name,
          size: file.size,
          mimetype: file.mimetype,
          md5: file.md5,
          path: filePath,
          url: `/api/v1/debug/uploads/${fileName}` // This would need a corresponding route to serve the file
        }
      });
      
    } catch (moveError) {
      console.error('Error moving file:', moveError);
      return res.status(500).json({
        success: false,
        error: `Error moving file: ${moveError.message}`
      });
    }
    
  } catch (error) {
    console.error('Debug upload error:', error);
    return res.status(500).json({
      success: false,
      error: `Debug upload error: ${error.message}`
    });
  }
};

// @desc    Get debug upload info
// @route   GET /api/v1/debug/upload-info
exports.getUploadInfo = (req, res) => {
  try {
    // Get environment variables for upload
    const cloudinaryConfig = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'Not configured',
      api_key: process.env.CLOUDINARY_API_KEY ? 'Configured' : 'Not configured',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Configured' : 'Not configured'
    };
    
    // Check upload directory
    const uploadDir = path.join(__dirname, '../uploads');
    let dirExists = false;
    let isWritable = false;
    let files = [];
    
    try {
      dirExists = fs.existsSync(uploadDir);
      if (dirExists) {
        // Check if directory is writable
        fs.accessSync(uploadDir, fs.constants.W_OK);
        isWritable = true;
        
        // Get list of files in the directory
        files = fs.readdirSync(uploadDir);
      }
    } catch (err) {
      console.error('Error checking upload directory:', err);
    }
    
    res.json({
      success: true,
      uploadDirectory: {
        path: uploadDir,
        exists: dirExists,
        isWritable,
        files
      },
      environment: {
        cloudinary: cloudinaryConfig,
        nodeEnv: process.env.NODE_ENV || 'Not set'
      },
      expressFileUpload: {
        configured: typeof req.files !== 'undefined' ? 'Yes' : 'No'
      }
    });
    
  } catch (error) {
    console.error('Error getting upload info:', error);
    res.status(500).json({
      success: false,
      error: `Error getting upload info: ${error.message}`
    });
  }
};
