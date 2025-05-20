const cloudinary = require('cloudinary').v2;

// @desc    Check Cloudinary connection
// @route   GET /api/v1/debug/cloudinary
// @access  Private
exports.checkCloudinaryConnection = async (req, res) => {
  try {
    // Print out the Cloudinary configuration
    console.log('Cloudinary Configuration:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? 'Exists (hidden)' : 'Missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Exists (hidden)' : 'Missing'
    });

    // Test Cloudinary connection by getting account info
    const result = await cloudinary.api.ping();
    
    res.status(200).json({
      success: true,
      message: 'Cloudinary connection successful',
      data: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        connectionStatus: result.status === 'pong' ? 'connected' : 'error'
      }
    });
  } catch (error) {
    console.error('Cloudinary connection test error:', error);
    res.status(500).json({
      success: false,
      error: `Cloudinary connection failed: ${error.message}`,
      config: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'missing',
        apiKeyExists: !!process.env.CLOUDINARY_API_KEY,
        apiSecretExists: !!process.env.CLOUDINARY_API_SECRET
      }
    });
  }
};

// @desc    Test Cloudinary configuration
// @route   GET /api/v1/debug/cloudinary
exports.testCloudinary = async (req, res) => {
  try {
    // Print Cloudinary config (excluding secrets)
    console.log('Cloudinary Config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET'
    });

    // Test connection by getting account info
    const result = await cloudinary.api.ping();
    
    res.status(200).json({
      success: true,
      message: 'Cloudinary connection successful',
      data: result
    });
  } catch (error) {
    console.error('Cloudinary test error:', error);
    res.status(500).json({
      success: false,
      error: `Cloudinary connection test failed: ${error.message}`,
      config: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'missing',
        apiKeyExists: Boolean(process.env.CLOUDINARY_API_KEY),
        apiSecretExists: Boolean(process.env.CLOUDINARY_API_SECRET)
      }
    });
  }
};
