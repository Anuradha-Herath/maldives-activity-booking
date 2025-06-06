import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Configure axios with credentials
axios.defaults.withCredentials = true;

// Register new user
export const register = async (userData) => {
  try {
    console.log('Attempting to register with data:', userData);
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    console.log('Registration response:', response.data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
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
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Unauthorized, clear token
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};
