import axios from 'axios';
import { useEffect, useState } from 'react';
import tokenManager from './tokenManager';

/**
 * Custom hook to monitor authentication status and provide utilities
 * for diagnosing and fixing authentication issues
 * 
 * @returns {Object} Authentication monitoring tools and state
 */
export const useAuthMonitor = () => {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: tokenManager.isAuthenticated(),
    tokenValid: !!tokenManager.getToken(),
    lastChecked: null,
    checking: false,
    error: null
  });

  // Check with the server to verify authentication
  const verifyAuthWithServer = async () => {
    setAuthStatus(prev => ({ ...prev, checking: true, error: null }));

    try {
      // First get the token from storage
      const token = tokenManager.getToken();
      if (!token) {
        setAuthStatus({
          isAuthenticated: false,
          tokenValid: false,
          lastChecked: new Date(),
          checking: false,
          error: 'No authentication token found'
        });
        return false;
      }

      // Get API URL (handle environment variable issues)
      let apiUrl = import.meta.env.VITE_API_URL;
      if (typeof apiUrl === 'string' && apiUrl.startsWith('VITE_API_URL=')) {
        apiUrl = apiUrl.replace('VITE_API_URL=', '');
      }
      const API_URL = apiUrl || 'https://maldives-activity-booking-backend.onrender.com/api/v1';

      // Call auth status endpoint
      const response = await axios.get(`${API_URL}/auth/status`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      
      const isAuthenticated = response.data?.authenticated || false;

      setAuthStatus({
        isAuthenticated,
        tokenValid: true,
        lastChecked: new Date(),
        checking: false,
        error: null
      });

      return isAuthenticated;
    } catch (error) {
      setAuthStatus({
        isAuthenticated: false,
        tokenValid: false,
        lastChecked: new Date(),
        checking: false,
        error: error.message
      });
      return false;
    }
  };

  // Fix authentication if there are issues
  const fixAuthIssues = async () => {
    console.log('Fixing authentication issues...');
    
    // Clear existing auth data
    tokenManager.clearAuth();
    
    // Clear axios headers
    delete axios.defaults.headers.common['Authorization'];
    
    // Update status
    setAuthStatus({
      isAuthenticated: false,
      tokenValid: false,
      lastChecked: new Date(),
      checking: false,
      error: 'Authentication reset due to issues'
    });
    
    return {
      success: true,
      message: 'Authentication data has been reset, please log in again'
    };
  };

  // Run initial check when component mounts
  useEffect(() => {
    // Only check if we appear to have a token
    if (tokenManager.getToken()) {
      verifyAuthWithServer();
    }
  }, []);

  return {
    authStatus,
    verifyAuthWithServer,
    fixAuthIssues,
    isAuthenticated: authStatus.isAuthenticated
  };
};

export default useAuthMonitor;
