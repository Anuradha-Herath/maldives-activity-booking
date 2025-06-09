/**
 * File: tokenManager.js
 * Description: Utility functions for managing authentication tokens with enhanced reliability
 */

// Store token in localStorage with error handling
export const setToken = (token) => {
  try {
    if (!token) {
      console.warn('Attempted to store empty token');
      return false;
    }
    
    localStorage.setItem('token', token);
    console.log('Token stored in localStorage');
    return true;
  } catch (error) {
    console.error('Error storing token in localStorage:', error);
    return false;
  }
};

// Store user data in localStorage with error handling
export const setUser = (user) => {
  try {
    if (!user) {
      console.warn('Attempted to store empty user data');
      return false;
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    console.log('User data stored in localStorage');
    return true;
  } catch (error) {
    console.error('Error storing user data in localStorage:', error);
    return false;
  }
};

// Get token from localStorage with error handling
export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token from localStorage:', error);
    return null;
  }
};

// Get user data from localStorage with error handling
export const getUser = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null;
  }
};

// Clear authentication data from localStorage with error handling
export const clearAuth = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Auth data cleared from localStorage');
    return true;
  } catch (error) {
    console.error('Error clearing auth data from localStorage:', error);
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  try {
    const token = getToken();
    const user = getUser();
    return !!token && !!user;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

// Enhanced token validation check (for deployment diagnostics)
export const validateTokenFormat = (token) => {
  if (!token) return false;
  
  // JWT tokens typically have 3 parts separated by dots
  const parts = token.split('.');
  if (parts.length !== 3) {
    console.error('Invalid token format: Token does not have 3 parts');
    return false;
  }
  
  // Each part should be a valid base64url string
  try {
    // Try to decode each part (not actually validating signature)
    atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
    atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    // Don't try to decode signature as it's not required
    
    return true;
  } catch (error) {
    console.error('Invalid token format: Parts are not valid base64url strings', error);
    return false;
  }
};

// Save authentication response data with enhanced reliability
export const saveAuthData = (responseData) => {
  if (!responseData) {
    console.error('No response data provided to save');
    return false;
  }
  
  let success = true;
  
  // Handle token
  if (responseData.token) {
    if (!validateTokenFormat(responseData.token)) {
      console.warn('Received token with invalid format');
    }
    success = setToken(responseData.token) && success;
  } else {
    console.error('No token in auth response data');
    success = false;
  }
  
  // Handle user data
  if (responseData.user) {
    success = setUser(responseData.user) && success;
  } else {
    console.error('No user data in auth response data');
    success = false;
  }
  
  return success;
};

export default {
  setToken,
  setUser,
  getToken,
  getUser,
  clearAuth,
  isAuthenticated,
  validateTokenFormat,
  saveAuthData
};
