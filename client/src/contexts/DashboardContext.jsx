import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { bookingsAPI } from '../utils/api';
import bookingEvents from '../utils/BookingEventEmitter';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    upcomingBookings: [],
    bookingHistory: [],
    loading: false,
    error: null
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  // Comprehensive dashboard refresh function
  const refreshDashboard = useCallback(async (forceRefresh = false) => {
    // Check if we should force refresh or if there's a flag indicating we need to refresh
    const needsRefresh = forceRefresh || 
      localStorage.getItem('force_dashboard_refresh') === 'true' ||
      sessionStorage.getItem('dashboard_refresh_needed') === 'true';
    
    if (!needsRefresh && lastRefreshTime) {
      // Check if we've refreshed recently (within the last 30 seconds) to avoid excessive refreshes
      if (Date.now() - lastRefreshTime < 30000) {
        console.log('Skipping dashboard refresh - recently refreshed');
        return dashboardData;
      }
    }
    
    console.log('Refreshing dashboard data...');
    setDashboardData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Parallel requests for better performance
      const [statsResponse, upcomingResponse, historyResponse] = await Promise.all([
        bookingsAPI.getUserStats(),
        bookingsAPI.getUserUpcoming(),
        bookingsAPI.getUserHistory()
      ]);
      
      // Check for recent booking and fetch it specifically if needed
      let latestBooking = null;
      const newBookingCreated = localStorage.getItem('new_booking_created') === 'true';
      
      if (newBookingCreated) {
        try {
          const latestResponse = await bookingsAPI.getLatestBooking();
          if (latestResponse.data.success) {
            latestBooking = latestResponse.data.data;
            console.log('Fetched latest booking:', latestBooking._id);
          }
        } catch (err) {
          console.error('Error fetching latest booking:', err);
        }
        // Clear the flag
        localStorage.removeItem('new_booking_created');
      }
      
      // Ensure upcoming bookings include the latest booking if it's not already there
      let upcomingBookings = upcomingResponse.data.data || [];
      
      if (latestBooking && !upcomingBookings.some(booking => booking._id === latestBooking._id)) {
        // Check if it's an upcoming booking
        const today = new Date();
        const bookingDate = new Date(latestBooking.date);
        
        if (bookingDate >= today && ['pending', 'confirmed'].includes(latestBooking.status)) {
          console.log('Adding latest booking to upcoming bookings');
          upcomingBookings = [latestBooking, ...upcomingBookings];
        }
      }
      
      const newData = {
        stats: statsResponse.data.data,
        upcomingBookings,
        bookingHistory: historyResponse.data.data || [],
        loading: false,
        error: null
      };
      
      setDashboardData(newData);
      setLastRefreshTime(Date.now());
      
      // Update timestamps
      localStorage.removeItem('force_dashboard_refresh');
      sessionStorage.removeItem('dashboard_refresh_needed');
      
      console.log('Dashboard data refreshed successfully');
      return newData;
    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
      setDashboardData(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Failed to load dashboard data. Please try again.' 
      }));
      throw error;
    }
  }, [lastRefreshTime, dashboardData]);

  // Force a refresh by incrementing the trigger
  const triggerRefresh = useCallback(() => {
    console.log('Manual dashboard refresh triggered');
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Set up event listeners for real-time updates
  useEffect(() => {
    const handleBookingCreated = (bookingData) => {
      console.log('Booking created event received in DashboardContext:', bookingData._id);
      triggerRefresh();
    };
    
    const handleBookingUpdated = () => {
      console.log('Booking updated event received in DashboardContext');
      triggerRefresh();
    };
    
    bookingEvents.on('booking_created', handleBookingCreated);
    bookingEvents.on('booking_updated', handleBookingUpdated);
    bookingEvents.on('booking_cancelled', handleBookingUpdated);
    
    return () => {
      bookingEvents.off('booking_created', handleBookingCreated);
      bookingEvents.off('booking_updated', handleBookingUpdated);
      bookingEvents.off('booking_cancelled', handleBookingUpdated);
    };
  }, [triggerRefresh]);

  // Check for dashboard refresh flags on component mount
  useEffect(() => {
    const checkForRefreshFlags = () => {
      const needsRefresh = localStorage.getItem('dashboard_needs_refresh') === 'true' ||
        sessionStorage.getItem('dashboard_refresh_needed') === 'true';
        
      if (needsRefresh) {
        console.log('Dashboard refresh needed flag detected');
        refreshDashboard(true);
        localStorage.removeItem('dashboard_needs_refresh');
      }
    };
    
    checkForRefreshFlags();
    
    // Also check URL parameters for refresh indicators
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('booking') || queryParams.has('refresh')) {
      console.log('Refresh parameter detected in URL');
      refreshDashboard(true);
    }
  }, [refreshDashboard]);

  return (
    <DashboardContext.Provider value={{ 
      ...dashboardData, 
      refreshDashboard,
      triggerRefresh,
      refreshTrigger,
      lastRefreshTime
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export default DashboardContext;
