import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  login as loginService, 
  logout as logoutService, 
  register as registerService,
  forgotPassword as forgotPasswordService, 
  resetPassword as resetPasswordService,
  updateProfile as updateProfileService, 
  updatePassword as updatePasswordService,
  setupAxiosInterceptors
} from '../services/authService';

// Setup axios interceptors for authentication
setupAxiosInterceptors();

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      const data = await registerService(userData);
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await loginService(email, password);
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await logoutService();
      setCurrentUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      return await forgotPasswordService(email);
    } catch (err) {
      setError(err.response?.data?.error || 'Error sending reset email');
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      return await resetPasswordService(token, password);
    } catch (err) {
      setError(err.response?.data?.error || 'Password reset failed');
      throw err;
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const data = await updateProfileService(userData);
      setCurrentUser(data.data);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed');
      throw err;
    }
  };

  // Update password
  const updatePassword = async (passwordData) => {
    try {
      await updatePasswordService(passwordData);
    } catch (err) {
      setError(err.response?.data?.error || 'Password update failed');
      throw err;
    }
  };

  // Clear any error
  const clearError = () => setError(null);

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    updatePassword,
    setError,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
