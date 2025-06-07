const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  try {
    // Enhanced debugging for registration
    console.log('Registration attempt from origin:', req.headers.origin);
    console.log('Registration request body:', {
      ...req.body,
      password: req.body.password ? '[REDACTED]' : undefined
    });
    
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      console.error('Missing required fields for registration');
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide name, email and password' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`Registration failed: Email ${email} already in use`);
      return res.status(400).json({
        success: false,
        error: 'Email address is already in use'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });
    
    // Log success details
    console.log(`User registered successfully: ${user.name} (${user._id})`);
    
    // Send token response with detailed logging
    console.log('Sending token response for newly registered user');
    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error('Error in registration:', error);
    // Provide more helpful error messages
    if (error.code === 11000) {
      // Duplicate key error (usually email)
      res.status(400).json({ 
        success: false, 
        error: 'Email address is already in use' 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        error: error.message || 'Registration failed' 
      });
    }
  }
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res, next) => {
  try {
    // Enhanced debugging for login
    console.log('Login attempt from origin:', req.headers.origin);
    console.log('Login attempt for email:', req.body.email);
    
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      console.log('Login failed: Missing email or password');
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide an email and password' 
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log(`Login failed: No user found with email ${email}`);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log(`Login failed: Invalid password for user ${email}`);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    // Log successful login
    console.log(`User logged in successfully: ${user.name} (${user._id})`);
    console.log('Preparing token response for login');

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = async (req, res, next) => {
  try {
    console.log('Get current user request from:', req.headers.origin);
    console.log('User in request:', req.user ? req.user.id : 'Not authenticated');
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      console.log(`User not found with ID: ${req.user.id}`);
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    console.log(`Retrieved user data for: ${user.name} (${user._id})`);
    
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error getting user data:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc      Authentication status check - useful for debugging
// @route     GET /api/v1/auth/status
// @access    Public
exports.getAuthStatus = async (req, res) => {
  // Get token from request
  let token;
  
  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Check for token in cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }
  
  // Log request details for debugging
  console.log('Auth status check from origin:', req.headers.origin);
  console.log('Token present:', token ? 'Yes' : 'No');
  console.log('Cookies received:', req.cookies);
  console.log('Headers:', {
    origin: req.headers.origin,
    referer: req.headers.referer,
    host: req.headers.host,
    'user-agent': req.headers['user-agent'],
    'content-type': req.headers['content-type'],
    authorization: req.headers.authorization ? 'Present (not shown)' : 'Not present'
  });
  
  res.status(200).json({
    success: true,
    message: 'Auth status endpoint working',
    authenticated: Boolean(token),
    cookiesReceived: Boolean(req.cookies && Object.keys(req.cookies).length > 0),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    corsSettings: {
      allowedOrigins: req.app.get('corsOrigins') || 'Not explicitly set'
    }
  });
};

// @desc      Logout user / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = async (req, res, next) => {
  const options = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };
  
  // Match cookie settings with login for consistent behavior
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
    options.sameSite = 'none';
  }
  
  res.cookie('token', 'none', options);

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({ 
        success: false, 
        error: 'Password is incorrect' 
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'There is no user with that email' 
      });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, error: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid token' 
      });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  console.log(`Generated JWT token for user ${user.email}`);

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    path: '/',  // Ensure cookie is available across the entire site
  };
  
  // Apply production settings for cookies
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
    options.sameSite = 'none'; // Required for cross-site cookies in modern browsers
    console.log('Using production cookie settings with secure=true and sameSite=none');
  } else {
    console.log('Using development cookie settings');
  }
  
  console.log('Cookie options:', {
    ...options,
    expires: options.expires.toISOString(),
  });

  // Log the response being sent
  console.log(`Sending authentication response with status code ${statusCode}`);
  
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
};
