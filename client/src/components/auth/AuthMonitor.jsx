import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useAuthMonitor from '../../utils/useAuthMonitor';

/**
 * Component that monitors authentication status and provides
 * notifications and fixes for authentication issues
 */
const AuthMonitor = () => {
  const { currentUser } = useAuth();
  const { authStatus, verifyAuthWithServer, fixAuthIssues } = useAuthMonitor();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);
  
  // Monitor for authentication inconsistencies
  useEffect(() => {
    // Only check in these specific scenarios to avoid unnecessary checks
    const shouldCheck = 
      // We think we're authenticated locally but haven't verified with server
      (currentUser && !authStatus.lastChecked) ||
      // Local and server auth state are inconsistent
      (currentUser && authStatus.lastChecked && !authStatus.isAuthenticated);
    
    if (shouldCheck) {
      // Wait a bit before checking to avoid race conditions with initial load
      const timer = setTimeout(() => {
        verifyAuthWithServer();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentUser, authStatus.lastChecked, authStatus.isAuthenticated]);
  
  // Show message if auth is inconsistent
  useEffect(() => {
    if (currentUser && authStatus.lastChecked && !authStatus.isAuthenticated) {
      setMessage({
        type: 'warning',
        text: 'Your session may have expired. Please log in again.',
        action: fixAuthIssues
      });
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [currentUser, authStatus]);
  
  // Don't render anything if no message to show
  if (!showMessage || !message) {
    return null;
  }
  
  return (
    <div className={`fixed bottom-4 right-4 rounded-md shadow-lg p-4 max-w-md z-50
                    ${message.type === 'warning' ? 'bg-yellow-100 border-yellow-400' : 
                     message.type === 'error' ? 'bg-red-100 border-red-400' : 
                     'bg-blue-100 border-blue-400'} border-l-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {message.type === 'warning' ? (
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : message.type === 'error' ? (
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm ${
            message.type === 'warning' ? 'text-yellow-700' : 
            message.type === 'error' ? 'text-red-700' : 
            'text-blue-700'
          }`}>
            {message.text}
          </p>
          {message.action && (
            <div className="mt-2">
              <button
                onClick={() => {
                  message.action();
                  setShowMessage(false);
                  // Force page reload after fixing auth issues
                  window.location.href = '/login';
                }}
                className={`inline-flex items-center px-2 py-1 border border-transparent text-xs rounded-md 
                ${message.type === 'warning' ? 'bg-yellow-700 hover:bg-yellow-800' : 
                  message.type === 'error' ? 'bg-red-700 hover:bg-red-800' : 
                  'bg-blue-700 hover:bg-blue-800'} text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${message.type === 'warning' ? 'focus:ring-yellow-500' : 
                  message.type === 'error' ? 'focus:ring-red-500' : 
                  'focus:ring-blue-500'}`}
              >
                Fix now
              </button>
              <button
                onClick={() => setShowMessage(false)}
                className="ml-2 inline-flex items-center px-2 py-1 border border-gray-300 text-xs rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthMonitor;
