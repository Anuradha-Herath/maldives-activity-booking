import axios from 'axios';

// Create axios instance with base URL - use environment variable or fallback to local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

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
    return config;
  },  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Only log errors in development mode
    if (import.meta.env.DEV) {
      console.error('API Error:', error.config?.url, error.response?.status, error.message);
    }
    return Promise.reject(error);
  }
);

// Activities API
export const activitiesAPI = {
  // fetch all activities or filter by query params (e.g., type)
  getAll: (params) => API.get('/activities', { params }),
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
