import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Create dashboard context
const DashboardContext = createContext();

// Key for local storage
const REFRESH_KEY = 'dashboard_refresh_timestamp';

// Custom hook to use dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Dashboard provider component
export const DashboardProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [lastRefreshTime, setLastRefreshTime] = useState(0);

  // Initialize from localStorage on component mount
  useEffect(() => {
    const storedTimestamp = localStorage.getItem(REFRESH_KEY);
    if (storedTimestamp) {
      setLastRefreshTime(parseInt(storedTimestamp));
    }
  }, []);

  // Function to trigger dashboard refresh
  const refreshDashboard = useCallback(() => {
    const timestamp = Date.now();
    // Update local state
    setRefreshTrigger(prev => prev + 1);
    setLastRefreshTime(timestamp);
    
    // Update localStorage for persistence across page navigations
    localStorage.setItem(REFRESH_KEY, timestamp.toString());
    
    // Log refresh for debugging in production
    console.log(`Dashboard refresh triggered at ${new Date(timestamp).toISOString()}`);
  }, []);
  const value = {
    refreshTrigger,
    refreshDashboard,
    lastRefreshTime
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
