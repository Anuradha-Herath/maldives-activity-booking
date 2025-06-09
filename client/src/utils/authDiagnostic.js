/**
 * authDiagnostic.js - Authentication Diagnostic Tool
 * 
 * This utility helps diagnose authentication issues in the deployed application.
 * It provides functions to check and fix common authentication problems.
 */

import axios from 'axios';
import tokenManager from './tokenManager';

/**
 * Get the API URL from environment or use default
 */
const getApiUrl = () => {
  // More robust API URL handling
  let apiUrl = import.meta.env.VITE_API_URL;

  // Handle common deployment issues with environment variables
  if (typeof apiUrl === 'string') {
    // Fix case where the variable name is included in the value
    if (apiUrl.startsWith('VITE_API_URL=')) {
      apiUrl = apiUrl.replace('VITE_API_URL=', '');
      console.log('Fixed API URL format (removed variable name):', apiUrl);
    }
    
    // Fix case where there might be quotes in the string
    apiUrl = apiUrl.replace(/^["'](.+)["']$/, '$1');
    
    // Fix case where API path might be duplicated
    if (apiUrl.includes('/api/v1/api/v1')) {
      apiUrl = apiUrl.replace('/api/v1/api/v1', '/api/v1');
      console.log('Fixed duplicate API path:', apiUrl);
    }
  }

  // Fallback to known deployed backend if variable is missing
  return apiUrl || 'https://maldives-activity-booking-backend.onrender.com/api/v1';
};

/**
 * Test connection to the API server
 */
export const testApiConnection = async () => {
  const apiUrl = getApiUrl();
  
  try {
    console.log(`Testing connection to API server: ${apiUrl}`);
    
    const response = await axios.get(`${apiUrl}/test-connection`, {
      withCredentials: true
    });
    
    console.log('Connection successful!', {
      environment: response.data?.server?.environment || 'unknown',
      timestamp: response.data?.server?.timestamp || 'unknown',
      cors: response.data?.cors || 'unknown'
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('API connection failed:', error.message);
    
    return {
      success: false,
      error: error.message,
      response: error.response?.data
    };
  }
};

/**
 * Check authentication status with the server
 */
export const checkAuthStatus = async () => {
  const apiUrl = getApiUrl();
  const token = tokenManager.getToken();
  
  try {
    console.log('Checking authentication status with server...');
    
    const response = await axios.get(`${apiUrl}/auth/status`, {
      withCredentials: true,
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });
    
    console.log('Auth status check successful:', response.data);
    
    return {
      success: true,
      authenticated: response.data.authenticated || false,
      data: response.data
    };
  } catch (error) {
    console.error('Auth status check failed:', error.message);
    
    return {
      success: false,
      authenticated: false,
      error: error.message,
      response: error.response?.data
    };
  }
};

/**
 * Verify that authentication is working properly in the current environment
 */
export const verifyAuthFlow = async () => {
  console.log('Verifying complete authentication flow...');
  const results = {
    connection: null,
    authStatus: null,
    tokenValid: false,
    userDataValid: false,
    conclusion: ''
  };
  
  // Step 1: Test API connection
  results.connection = await testApiConnection();
  if (!results.connection.success) {
    results.conclusion = 'Cannot connect to API server. Please check network and server status.';
    return results;
  }
  
  // Step 2: Check auth status
  results.authStatus = await checkAuthStatus();
  
  // Step 3: Check local token and user data
  const token = tokenManager.getToken();
  const user = tokenManager.getUser();
  
  results.tokenValid = Boolean(token && tokenManager.validateTokenFormat(token));
  results.userDataValid = Boolean(user && user.id && user.email);
  
  // Evaluate results
  if (results.authStatus.authenticated && results.tokenValid && results.userDataValid) {
    results.conclusion = 'Authentication is working correctly.';
  } else if (!results.tokenValid) {
    results.conclusion = 'Invalid or missing token. User may need to log in again.';
  } else if (!results.userDataValid) {
    results.conclusion = 'Missing or invalid user data. User may need to log in again.';
  } else if (!results.authStatus.authenticated) {
    results.conclusion = 'Server does not recognize the authentication token. User needs to log in again.';
  } else {
    results.conclusion = 'Unknown authentication issue.';
  }
  
  return results;
};

/**
 * Fix common authentication issues automatically
 */
export const fixAuthenticationIssues = () => {
  console.log('Attempting to fix common authentication issues...');
  
  // Clear problematic authentication data
  const hadToken = Boolean(tokenManager.getToken());
  const hadUserData = Boolean(tokenManager.getUser());
  
  // Clear all auth data
  tokenManager.clearAuth();
  
  // Clear any lingering cookies if possible
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.trim().split('=')[0];
    if (name.includes('token')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
  
  // Clear authorization headers
  delete axios.defaults.headers.common['Authorization'];
  
  console.log('Authentication reset complete', {
    clearedToken: hadToken,
    clearedUserData: hadUserData
  });
  
  return {
    success: true,
    clearedToken: hadToken,
    clearedUserData: hadUserData,
    message: 'Authentication data has been reset. Please log in again.'
  };
};

/**
 * Run all diagnostics and fix issues
 */
export const runFullDiagnostic = async () => {
  console.log('Running full authentication diagnostic...');
  
  // Step 1: Verify authentication flow
  const verificationResults = await verifyAuthFlow();
  
  if (verificationResults.conclusion.includes('working correctly')) {
    return {
      success: true,
      needsAction: false,
      message: 'Authentication is working correctly.',
      details: verificationResults
    };
  }
  
  // Step 2: Fix issues
  const fixResults = fixAuthenticationIssues();
  
  return {
    success: true,
    needsAction: true,
    message: 'Authentication issues detected and fixed. User needs to login again.',
    details: {
      verification: verificationResults,
      fix: fixResults
    }
  };
};

export default {
  testApiConnection,
  checkAuthStatus,
  verifyAuthFlow,
  fixAuthenticationIssues,
  runFullDiagnostic
};
