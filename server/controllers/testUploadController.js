// @desc    Test file upload without Cloudinary
// @route   POST /api/v1/test-upload
exports.testFileUpload = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        error: 'No file was uploaded'
      });
    }

    const file = req.files.file;
    
    // Just return information about the file to confirm it was received
    res.status(200).json({
      success: true,
      message: 'File received successfully',
      fileInfo: {
        name: file.name,
        size: file.size,
        mimetype: file.mimetype
      }
    });
  } catch (error) {
    console.error('Test upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Test upload failed: ' + (error.message || 'Server error')
    });
  }
};
