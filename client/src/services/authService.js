import axios from 'axios';

// More robust API URL handling
let apiUrl = import.meta.env.VITE_API_URL;

// Handle common deployment issues with environment variables
if (apiUrl && apiUrl.startsWith('VITE_API_URL=')) {
  apiUrl = apiUrl.replace('VITE_API_URL=', '');
  console.log('Fixed API URL format:', apiUrl);
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
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Also store basic user info
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;  } catch (error) {
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
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Also store basic user info
      localStorage.setItem('user', JSON.stringify(response.data.user));
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
    await axios.get(`${API_URL}/auth/logout`);
  } catch (error) {
    console.error('Logout error:', error);
  }
  localStorage.removeItem('token');
};

// Get current user
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  } catch (error) {
    console.error('Get current user error:', error);
    localStorage.removeItem('token');
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
  // Remove any previous interceptors to avoid duplicates
  axios.interceptors.request.eject(axios.interceptors.request.handlers?.[0]);
  axios.interceptors.response.eject(axios.interceptors.response.handlers?.[0]);
  
  // Setup request interceptor with enhanced token handling
  axios.interceptors.request.use(
    (config) => {
      // Always ensure credentials are sent
      config.withCredentials = true;
      
      // Add Authorization header with token if available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Log request in deployed environment
      if (import.meta.env.PROD) {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      }
      
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Setup response interceptor with better error handling
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle specific API errors
      if (error.response) {
        const { status, data } = error.response;
        
        // Log all API errors in deployed environment
        if (import.meta.env.PROD) {
          console.error(`API Error ${status}:`, data);
        }
        
        if (status === 401) {
          // Unauthorized - clear token and redirect to login
          console.warn('Authentication error: User not authenticated or token expired');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Only redirect if not already on auth pages
          const currentPath = window.location.pathname;
          if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
            window.location.href = '/login';
          }
        }
      } else if (error.request) {
        // Request was made but no response received (network error)
        console.error('Network error: No response received from server');
      }
      
      return Promise.reject(error);
    }
  );
};
