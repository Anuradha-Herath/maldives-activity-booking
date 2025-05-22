import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-4"></div>
        <p className="text-gray-600">Loading admin panel...</p>
      </div>
    );
  }
  
  if (!currentUser) {
    // Redirect to login if not logged in, and remember requested page
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  if (currentUser.role !== 'admin') {
    // Show access denied page or redirect to home for non-admin users
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Access Denied
          </h2>
          <p className="text-gray-700 mb-6">
            You don't have permission to access the admin area. This area is restricted to administrators only.
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return children;
};

export default AdminRoute;
