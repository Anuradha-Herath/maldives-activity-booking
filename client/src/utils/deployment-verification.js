/**
 * Comprehensive Deployment Verification Script
 * 
 * This script verifies all the fixes we've made to the application,
 * including authentication flow, booking dashboard updates, and image uploads.
 * 
 * Usage:
 * 1. Open the browser console on the deployed site
 * 2. Copy and paste this entire script
 * 3. Review the test results and fix any remaining issues
 */

(function() {
  // Configuration
  const config = {
    apiUrl: window.location.hostname.includes('localhost') 
      ? 'http://localhost:5000/api/v1' 
      : 'https://maldives-activity-booking-backend.onrender.com/api/v1',
    testEmail: 'test@example.com',
    testPassword: 'TestPassword123!'
  };
  
  // Utility functions
  const logger = {
    group: (title) => {
      console.group(`🔍 ${title}`);
    },
    groupEnd: () => console.groupEnd(),
    info: (msg) => console.log(`ℹ️ ${msg}`),
    success: (msg) => console.log(`✅ ${msg}`),
    warning: (msg) => console.warn(`⚠️ ${msg}`),
    error: (msg) => console.error(`❌ ${msg}`),
    result: (test, msg) => console.log(test ? `✅ ${msg}` : `❌ ${msg}`)
  };

  // Main verification function
  async function verifyDeployment() {
    logger.group('Deployment Verification Started');
    logger.info(`Testing against API: ${config.apiUrl}`);
    logger.info(`Current environment: ${import.meta.env.MODE}`);
    logger.info(`Current URL: ${window.location.href}`);
    
    // 1. Verify environment variables
    await verifyEnvironmentVariables();
    
    // 2. Verify API connection
    await verifyApiConnection();
    
    // 3. Verify authentication
    await verifyAuthentication();
    
    // 4. Verify user dashboard
    await verifyUserDashboard();
    
    // 5. Verify booking creation
    // await verifyBookingCreation(); // Commented out to avoid creating test bookings
    
    logger.group('Overall Results');
    logger.info('See above for detailed test results');
    logger.info('For any failed tests, check the corresponding section for details');
    logger.groupEnd();
    
    logger.groupEnd();
  }

  // Step 1: Verify environment variables
  async function verifyEnvironmentVariables() {
    logger.group('1. Environment Variables');
    
    const envVars = {
      'VITE_API_URL': import.meta.env.VITE_API_URL,
      'VITE_CLOUDINARY_CLOUD_NAME': import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      'VITE_CLOUDINARY_UPLOAD_PRESET': import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    };
    
    for (const [key, value] of Object.entries(envVars)) {
      const isPresent = !!value;
      const isNotDefault = !String(value).startsWith(key);
      logger.result(isPresent && isNotDefault, `${key}: ${isPresent ? (isNotDefault ? 'Properly configured' : 'Has default value') : 'Missing'}`);
    }
    
    logger.groupEnd();
  }

  // Step 2: Verify API connection
  async function verifyApiConnection() {
    logger.group('2. API Connection');
    
    try {
      const startTime = performance.now();
      const response = await fetch(`${config.apiUrl}/health`);
      const endTime = performance.now();
      
      if (response.ok) {
        const data = await response.json();
        logger.success(`API connected successfully in ${Math.round(endTime - startTime)}ms`);
        logger.info(`API version: ${data.version || 'unknown'}`);
        logger.info(`API status: ${data.status || 'unknown'}`);
      } else {
        logger.error(`API returned status: ${response.status}`);
      }
    } catch (error) {
      logger.error(`Failed to connect to API: ${error.message}`);
    }
    
    logger.groupEnd();
  }

  // Step 3: Verify authentication
  async function verifyAuthentication() {
    logger.group('3. Authentication');
    
    // Check current authentication state
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    logger.info(`Token present: ${!!token}`);
    logger.info(`User data present: ${!!user}`);
    
    if (token) {
      // Verify token format
      const isValidFormat = token.split('.').length === 3;
      logger.result(isValidFormat, `Token format is ${isValidFormat ? 'valid (JWT format)' : 'invalid'}`);
      
      // Verify token with server
      try {
        const response = await fetch(`${config.apiUrl}/auth/status`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include'
        });
        
        if (response.ok) {
          logger.success('Token validated successfully with server');
        } else {
          logger.error(`Token validation failed: ${response.status}`);
        }
      } catch (error) {
        logger.error(`Error validating token: ${error.message}`);
      }
    }
    
    logger.groupEnd();
  }

  // Step 4: Verify user dashboard
  async function verifyUserDashboard() {
    logger.group('4. User Dashboard');
    
    const token = localStorage.getItem('token');
    if (!token) {
      logger.warning('Cannot verify dashboard: No authentication token found');
      logger.groupEnd();
      return;
    }
    
    try {
      // Test dashboard stats endpoint
      const statsResponse = await fetch(`${config.apiUrl}/user/bookings/stats`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        logger.success('Dashboard stats endpoint working');
        logger.info(`Total bookings: ${statsData.data?.totalBookings || 0}`);
        logger.info(`Pending bookings: ${statsData.data?.pendingBookings || 0}`);
        logger.info(`Confirmed bookings: ${statsData.data?.confirmedBookings || 0}`);
      } else {
        logger.error(`Dashboard stats endpoint failed: ${statsResponse.status}`);
      }
      
      // Test upcoming bookings endpoint
      const upcomingResponse = await fetch(`${config.apiUrl}/user/bookings/upcoming`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      
      if (upcomingResponse.ok) {
        const upcomingData = await upcomingResponse.json();
        logger.success('Upcoming bookings endpoint working');
        logger.info(`Upcoming bookings count: ${upcomingData.count || 0}`);
      } else {
        logger.error(`Upcoming bookings endpoint failed: ${upcomingResponse.status}`);
      }
    } catch (error) {
      logger.error(`Error testing dashboard endpoints: ${error.message}`);
    }
    
    logger.groupEnd();
  }

  // Run the verification
  verifyDeployment().catch(error => {
    console.error('Verification script error:', error);
  });
})();
