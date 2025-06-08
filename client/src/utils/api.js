import axios from 'axios';

// Create axios instance with base URL - use environment variable or fallback to local development
// Check if the environment variable is being properly loaded, otherwise use a fallback
const envApiUrl = import.meta.env.VITE_API_URL;
const API_URL = (typeof envApiUrl === 'string' && !envApiUrl.startsWith('VITE_API_URL=')) 
  ? envApiUrl 
  : 'https://maldives-activity-booking-backend.onrender.com/api/v1';

// Debug: Log the API URL being used (only in development)
if (import.meta.env.DEV) {
  console.log('API URL:', API_URL);
  console.log('Environment:', import.meta.env.MODE);
}

// Create axios instance with base URL
const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Enable credentials for authentication
});

// Add request interceptor to include auth token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // For FormData uploads, remove the default Content-Type header
    // Let the browser set it automatically with the correct boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log('✅ API Success:', response.config?.method?.toUpperCase(), response.config?.url, response.status);
    }
    return response;
  },
  (error) => {
    // Enhanced error logging
    console.error('❌ API Error Details:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      data: error.response?.data,
      baseURL: error.config?.baseURL
    });
    
    // Additional debugging for CORS and network errors
    if (error.message.includes('Network Error') || !error.response) {
      console.error('🌐 Network Error - Possible causes:');
      console.error('- Backend server is down');
      console.error('- CORS configuration issue');
      console.error('- Network connectivity problem');
      console.error('- Incorrect API URL:', error.config?.baseURL);
    }
    
    return Promise.reject(error);
  }
);

// Activities API
export const activitiesAPI = {
  // Store the base URL for external access
  baseUrl: API_URL,
  
  // fetch all activities or filter by query params (e.g., type)
  getAll: async (params) => {
    console.log('🚀 Fetching all activities with params:', params);
    console.log('🔗 Using API base URL:', API.defaults.baseURL);
    
    try {
      // Use the full endpoint - Vite will proxy /api/ requests to the backend
      const response = await API.get('/activities', { params });
      console.log('📦 Activities API response:', response.data);
      return response;
    } catch (error) {
      console.error('💥 Activities API getAll failed:', error);
      throw error;
    }
  },
  getById: (id) => API.get(`/activities/${id}`),
  create: (data) => API.post('/activities', data),
  update: (id, data) => API.put(`/activities/${id}`, data),
  delete: (id) => API.delete(`/activities/${id}`)
};

// Bookings API
export const bookingsAPI = {
  create: (bookingData) => API.post('/bookings', bookingData),
  getAll: () => API.get('/bookings'),
  getById: (id) => API.get(`/bookings/${id}`),
  getByReference: (reference) => API.get(`/bookings/reference/${reference}`),
  updateStatus: (id, status) => API.put(`/bookings/${id}`, { status }),
  delete: (id) => API.delete(`/bookings/${id}`)
};

// Users API
export const usersAPI = {
  getAll: () => API.get('/users'),
  getById: (id) => API.get(`/users/${id}`),
  create: (userData) => API.post('/users', userData),
  update: (id, userData) => API.put(`/users/${id}`, userData),
  updateRole: (id, role) => API.put(`/users/${id}/role`, { role }),
  delete: (id) => API.delete(`/users/${id}`),
  getBookingCount: (id) => API.get(`/users/${id}/bookings/count`)
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => API.get('/dashboard/stats')
};

// User Bookings API
export const userBookingsAPI = {
  getAll: () => API.get('/user/bookings'),
  getHistory: () => API.get('/user/bookings/history'),
  getUpcoming: () => API.get('/user/bookings/upcoming'),
  getStats: () => API.get('/user/bookings/stats'),
  cancelBooking: (id) => API.put(`/user/bookings/${id}/cancel`)
};

// Function to upload image to Cloudinary
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'maldives_activities');
  
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dwzhs42tz';
  
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

export default API;
