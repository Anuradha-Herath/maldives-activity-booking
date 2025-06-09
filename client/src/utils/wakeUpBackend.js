/**
 * wakeUpBackend.js
 * 
 * This utility helps wake up the backend server if it's in sleep mode
 * (common with free deployment tiers like Render).
 */

import axios from 'axios';

// More robust API URL handling
export const getApiUrl = () => {
  let apiUrl = import.meta.env.VITE_API_URL;

  // Handle common deployment issues with environment variables
  if (typeof apiUrl === 'string') {
    // Fix case where the variable name is included in the value
    if (apiUrl.startsWith('VITE_API_URL=')) {
      apiUrl = apiUrl.replace('VITE_API_URL=', '');
    }
    
    // Fix case where there might be quotes in the string
    apiUrl = apiUrl.replace(/^["'](.+)["']$/, '$1');
    
    // Fix case where API path might be duplicated
    if (apiUrl.includes('/api/v1/api/v1')) {
      apiUrl = apiUrl.replace('/api/v1/api/v1', '/api/v1');
    }
  }

  // Fallback to known deployed backend if variable is missing
  return apiUrl || 'https://maldives-activity-booking-backend.onrender.com/api/v1';
};

/**
 * Wake up the backend server if it's sleeping
 * @param {Function} onProgress - Optional callback to report wake-up progress
 * @returns {Promise<Object>} - Results of the wake-up attempt
 */
export const wakeUpBackend = async (onProgress) => {
  const apiUrl = getApiUrl();
  const baseUrl = apiUrl.split('/api')[0];
  const startTime = Date.now();
  
  const updateProgress = (message) => {
    if (onProgress && typeof onProgress === 'function') {
      onProgress(message);
    }
    console.log(message);
  };
  
  try {
    updateProgress('Attempting to wake up backend server...');
    
    // First try the root endpoint which is lightweight
    updateProgress('Sending initial ping to server...');
    
    const response = await axios.get(`${baseUrl}`, {
      timeout: 10000 // 10 second timeout
    });
    
    if (response.status === 200) {
      const timeElapsed = (Date.now() - startTime) / 1000;
      updateProgress(`Backend responded in ${timeElapsed.toFixed(2)} seconds!`);
      
      // Also check the API endpoint
      updateProgress('Verifying API endpoints...');
      
      try {
        const apiResponse = await axios.get(`${apiUrl}/server-status`, {
          timeout: 5000
        });
        
        const totalTime = (Date.now() - startTime) / 1000;
        updateProgress(`API verified in ${totalTime.toFixed(2)} seconds!`);
        
        return {
          success: true,
          message: 'Backend server is awake and API is responding',
          responseTime: totalTime,
          serverInfo: apiResponse.data
        };
      } catch (apiError) {
        updateProgress('API verification failed, but server is awake');
        
        return {
          success: true,
          message: 'Backend server is awake but API verification failed',
          responseTime: timeElapsed,
          apiError: apiError.message
        };
      }
    }
    
    // Should not reach here if response was 200
    return {
      success: false,
      message: `Backend responded with status ${response.status}`,
      responseTime: (Date.now() - startTime) / 1000
    };
  } catch (error) {
    const timeElapsed = (Date.now() - startTime) / 1000;
    updateProgress(`Error waking up backend: ${error.message}`);
    
    if (timeElapsed < 2) {
      updateProgress('Server responded quickly with an error, it may already be awake');
    } else {
      updateProgress('Server took too long to respond, it may still be waking up');
    }
    
    return {
      success: false,
      message: 'Failed to wake up backend server',
      error: error.message,
      responseTime: timeElapsed
    };
  }
};

/**
 * Check backend health by calling multiple endpoints to ensure it's fully operational
 */
export const checkBackendHealth = async (onProgress) => {
  const apiUrl = getApiUrl();
  const startTime = Date.now();
  const results = {
    rootEndpoint: false,
    serverStatus: false,
    testConnection: false,
    authStatus: false,
    activitiesEndpoint: false,
    responseTime: 0,
    allEndpointsHealthy: false
  };
  
  const updateProgress = (message) => {
    if (onProgress && typeof onProgress === 'function') {
      onProgress(message);
    }
    console.log(message);
  };
  
  try {
    updateProgress('Checking backend health...');
    
    // Check root endpoint
    try {
      const rootResponse = await axios.get(`${apiUrl}`, { timeout: 5000 });
      results.rootEndpoint = rootResponse.status === 200;
      updateProgress(`Root endpoint check: ${results.rootEndpoint ? 'OK' : 'Failed'}`);
    } catch (error) {
      updateProgress('Root endpoint check failed');
    }
    
    // Check server status endpoint
    try {
      const statusResponse = await axios.get(`${apiUrl}/server-status`, { timeout: 5000 });
      results.serverStatus = statusResponse.status === 200;
      updateProgress(`Server status check: ${results.serverStatus ? 'OK' : 'Failed'}`);
    } catch (error) {
      updateProgress('Server status check failed');
    }
    
    // Check connection test endpoint
    try {
      const testResponse = await axios.get(`${apiUrl}/test-connection`, { timeout: 5000 });
      results.testConnection = testResponse.status === 200;
      updateProgress(`Connection test check: ${results.testConnection ? 'OK' : 'Failed'}`);
    } catch (error) {
      updateProgress('Connection test check failed');
    }
    
    // Check auth status endpoint
    try {
      const authResponse = await axios.get(`${apiUrl}/auth/status`, { timeout: 5000 });
      results.authStatus = authResponse.status === 200;
      updateProgress(`Auth status check: ${results.authStatus ? 'OK' : 'Failed'}`);
    } catch (error) {
      updateProgress('Auth status check failed');
    }
    
    // Check activities endpoint
    try {
      const activitiesResponse = await axios.get(`${apiUrl}/activities`, { timeout: 5000 });
      results.activitiesEndpoint = activitiesResponse.status === 200;
      updateProgress(`Activities endpoint check: ${results.activitiesEndpoint ? 'OK' : 'Failed'}`);
    } catch (error) {
      updateProgress('Activities endpoint check failed');
    }
    
    // Calculate response time and overall health
    results.responseTime = (Date.now() - startTime) / 1000;
    results.allEndpointsHealthy = results.rootEndpoint && 
                                  results.serverStatus && 
                                  results.testConnection &&
                                  results.authStatus && 
                                  results.activitiesEndpoint;
    
    updateProgress(`Backend health check completed in ${results.responseTime.toFixed(2)} seconds`);
    updateProgress(`Overall health: ${results.allEndpointsHealthy ? 'HEALTHY' : 'ISSUES DETECTED'}`);
    
    return results;
  } catch (error) {
    updateProgress(`Backend health check failed: ${error.message}`);
    
    results.responseTime = (Date.now() - startTime) / 1000;
    results.error = error.message;
    results.allEndpointsHealthy = false;
    
    return results;
  }
};

export default {
  wakeUpBackend,
  checkBackendHealth
};
