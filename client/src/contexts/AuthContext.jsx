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
import tokenManager from '../utils/tokenManager';

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
        // First check localStorage
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        console.log('Auth check on app load', { 
          hasToken: !!token,
          hasStoredUser: !!storedUser
        });
        
        // If we have stored user data, use it initially to prevent flicker
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            console.log('Using stored user data:', parsedUser?.name);
            setCurrentUser(parsedUser);
          } catch (e) {
            console.error('Error parsing stored user data:', e);
          }
        }
        
        // If we have a token, validate it by fetching fresh user data
        if (token) {
          const user = await getCurrentUser();
          
          if (user) {
            console.log('User session validated:', user.name);
            setCurrentUser(user);
          } else {
            console.log('Invalid user session, clearing local data');
            setCurrentUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } else {
          console.log('No authentication token found');
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Error loading user:', err);
        // Clear potentially invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
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
  // Login user with improved token validation
  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('Attempting login for:', email);
      
      const data = await loginService(email, password);
      
      if (data && data.user) {
        console.log('Login successful for:', data.user.name);
        setCurrentUser(data.user);
        
        // Ensure token is properly stored
        if (data.token && !tokenManager.getToken()) {
          tokenManager.setToken(data.token);
        }
        
        return data;
      } else {
        throw new Error('Login response missing user data');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Invalid credentials';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Logout user with improved cleanup
  const logout = async () => {
    try {
      console.log('Logging out user:', currentUser?.name || 'Unknown user');
      await logoutService();
      
      // Clear user state
      setCurrentUser(null);
      
      // Ensure all auth data is cleared
      tokenManager.clearAuth();
      
      console.log('Logout complete, all auth data cleared');
    } catch (err) {
      console.error('Error during logout:', err);
      // Still clear local data even if server request fails
      setCurrentUser(null);
      tokenManager.clearAuth();
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
