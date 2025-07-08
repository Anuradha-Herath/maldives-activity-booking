import axios from 'axios';
import tokenManager from '../utils/tokenManager';

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
const API_URL = apiUrl || 'https://maldives-activity-booking-backend.onrender.com/api/v1';
console.log('Using API URL:', API_URL);

// Configure axios with credentials
axios.defaults.withCredentials = true;

// Set consistent headers for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Register new user
export const register = async (userData) => {
  try {
    // Log the environment and request details
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Attempting to register with data:', {
      ...userData,
      password: '[REDACTED]'
    });
    console.log('API URL being used:', API_URL);
    
    // Make request with credentials to ensure cookies are sent/received
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    console.log('Registration response:', response.data);
      // Enhanced token handling with tokenManager
    if (response.data) {
      console.log('Authentication response received from server');
      
      // Use tokenManager to handle storage with validation
      const saveResult = tokenManager.saveAuthData(response.data);
      
      if (saveResult) {
        console.log('Authentication data successfully saved');
        
        // Get the token and set it in axios headers
        const token = tokenManager.getToken();
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('Authorization header set for subsequent requests');
        }
      } else {
        console.error('Failed to save authentication data');
      }
    } else {
      console.error('Empty response data received from registration');
    }
    
    return response.data;} catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    console.error('Full error details:', error);
    
    // Enhanced error diagnostics for deployed environment
    console.log('Network error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      isCORSError: error.message?.includes('CORS')
    });
    
    // Log the request details that failed
    if (error.config) {
      console.log('Request that failed:', {
        url: error.config.url,
        method: error.config.method,
        baseURL: error.config.baseURL,
        withCredentials: error.config.withCredentials,
        headers: { 
          ...error.config.headers, 
          Authorization: error.config.headers?.Authorization ? '[PRESENT]' : '[NOT PRESENT]' 
        },
      });
    }
    
    throw error;
  }
};

// Login user
export const login = async (email, password) => {
  try {
    console.log('Attempting login for email:', email);
    console.log('API URL being used:', API_URL);
    
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    console.log('Login response:', response.data);
    
    // Use tokenManager for enhanced storage and validation
    if (response.data) {
      const saveResult = tokenManager.saveAuthData(response.data);
      
      if (saveResult) {
        console.log('Login successful - auth data saved');
        
        // Set authorization header for subsequent requests
        const token = tokenManager.getToken();
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('Authorization header set after login');
        }
      } else {
        console.error('Failed to save login authentication data');
      }
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    console.error('Full error details:', error);
    
    // Log the request details that failed
    if (error.config) {
      console.log('Request that failed:', {
        url: error.config.url,
        method: error.config.method,
        headers: error.config.headers
      });
    }
    
    throw error;
  }
};

// Logout user
export const logout = async () => {
  try {
    console.log('Logging out user...');
    await axios.get(`${API_URL}/auth/logout`);
    console.log('Logout API call successful');
  } catch (error) {
    console.error('Logout API error:', error);
    // Continue with local logout even if API fails
  }
  
  // Use tokenManager to clear auth data
  tokenManager.clearAuth();
  
  // Also clear the authorization header
  delete axios.defaults.headers.common['Authorization'];
  console.log('User logged out successfully');
};

// Get current user
export const getCurrentUser = async () => {
  // Use tokenManager to get token
  const token = tokenManager.getToken();
  
  if (!token) {
    console.log('No token available, user is not authenticated');
    return null;
  }

  try {
    console.log('Fetching current user data...');
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data && response.data.data) {
      console.log('User data retrieved successfully');
      return response.data.data;
    } else {
      console.warn('User data endpoint returned unexpected format');
      return null;
    }
  } catch (error) {
    console.error('Get current user error:', error.response?.data || error.message);
    
    // If unauthorized or token invalid, clear auth data
    if (error.response?.status === 401) {
      console.log('Token invalid or expired, clearing auth data');
      tokenManager.clearAuth();
    }
    
    return null;
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/auth/updatedetails`, userData);
  return response.data;
};

// Update password
export const updatePassword = async (passwordData) => {
  const response = await axios.put(`${API_URL}/auth/updatepassword`, passwordData);
  return response.data;
};

// Forgot password
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/forgotpassword`, { email });
  return response.data;
};

// Reset password
export const resetPassword = async (token, password) => {
  const response = await axios.put(`${API_URL}/auth/resetpassword/${token}`, { password });
  return response.data;
};

// Setup axios interceptor for adding token to requests
export const setupAxiosInterceptors = () => {
  // Store interceptor IDs for future reference
  let requestInterceptorId = null;
  let responseInterceptorId = null;
  
  // Remove any previous interceptors to avoid duplicates
  if (axios.interceptors.request.handlers && axios.interceptors.request.handlers.length > 0) {
    axios.interceptors.request.handlers.forEach((handler, i) => {
      axios.interceptors.request.eject(i);
    });
  }
  
  if (axios.interceptors.response.handlers && axios.interceptors.response.handlers.length > 0) {
    axios.interceptors.response.handlers.forEach((handler, i) => {
      axios.interceptors.response.eject(i);
    });
  }
    console.log('Setting up axios interceptors for authentication');
  
  // Setup request interceptor with enhanced token handling
  requestInterceptorId = axios.interceptors.request.use(
    (config) => {
      // Always ensure credentials are sent
      config.withCredentials = true;
      
      // Ensure common headers are set for all requests
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      };
      
      // Add Authorization header with token if available - using tokenManager
      const token = tokenManager.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // Debug log for auth headers
        console.log(`Request to ${config.url} includes Authorization header`);
      } else {
        console.log(`No token available for request to ${config.url}`);
      }
      
      // Log all requests in deployment
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Setup response interceptor with better error handling
  responseInterceptorId = axios.interceptors.response.use(
    (response) => {
      // Check for token in response and save it if present
      if (response.data?.token && !localStorage.getItem('token')) {
        console.log('Token received in response, storing in localStorage');
        localStorage.setItem('token', response.data.token);
        
        // Set for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      // Check for user data in response
      if (response.data?.user && !localStorage.getItem('user')) {
        console.log('User data received in response, storing in localStorage');
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    },
    (error) => {
      // Handle specific API errors
      if (error.response) {
        const { status, data } = error.response;
        
        // Log all API errors
        console.error(`API Error ${status}:`, data);
        
        if (status === 401) {
          // Unauthorized - clear token and redirect to login
          console.warn('Authentication error: User not authenticated or token expired');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Only redirect if not already on auth pages
          const currentPath = window.location.pathname;
          if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
            console.log('Redirecting to login page due to authentication error');
            window.location.href = '/login';
          }
        }
      } else if (error.request) {
        // Request was made but no response received (network error)
        console.error('Network error: No response received from server', error.request);
      }
      
      return Promise.reject(error);
    }
  );
  
  console.log('Axios interceptors setup complete', { 
    requestInterceptorId, 
    responseInterceptorId 
  });
};
