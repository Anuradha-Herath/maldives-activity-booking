import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboard } from '../../contexts/DashboardContext';
import { userBookingsAPI } from '../../utils/api';
import bookingEvents from '../../utils/BookingEventEmitter';
import { useDashboardPerformanceTracking, logMetric } from '../../utils/performanceMonitoring';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const { refreshTrigger, lastRefreshTime, refreshDashboard } = useDashboard();
  const [stats, setStats] = useState({
    pendingBookings: 0,
    confirmedBookings: 0,
    totalBookings: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [refreshSource, setRefreshSource] = useState(null);
  const { markDataLoaded, recordError } = useDashboardPerformanceTracking();
  // Simplified fetch function
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    const startTime = performance.now();
    
    try {
      // Check for new booking completion
      const bookingCompleted = localStorage.getItem('booking_completed');
      const newBookingData = localStorage.getItem('new_booking_data');
      
      if (bookingCompleted === 'true' && newBookingData) {
        console.log('New booking detected, updating stats immediately');
        
        try {
          const booking = JSON.parse(newBookingData);
          
          // Update stats immediately for better UX
          setStats(prev => ({
            pendingBookings: (prev.pendingBookings || 0) + 1,
            confirmedBookings: prev.confirmedBookings || 0,
            totalBookings: (prev.totalBookings || 0) + 1
          }));
          
          // Add to recent bookings
          setRecentBookings(prev => [booking, ...prev.slice(0, 4)]);
          setLastUpdated(new Date().toLocaleTimeString() + ' (Updated)');
          
          // Clear the flags
          localStorage.removeItem('booking_completed');
          localStorage.removeItem('new_booking_data');
        } catch (e) {
          console.error('Error parsing new booking data:', e);
        }
      }
      
      // Fetch fresh data from API
      const response = await userBookingsAPI.getStats();
      
      if (response.data.success) {
        const { 
          pendingBookings, 
          confirmedBookings, 
          totalBookings,
          recentBookings 
        } = response.data.data;
        
        setStats({
          pendingBookings: pendingBookings || 0,
          confirmedBookings: confirmedBookings || 0,
          totalBookings: totalBookings || 0
        });
        
        setRecentBookings(recentBookings || []);
        setLastUpdated(new Date().toLocaleTimeString());
        console.log('Dashboard data refreshed successfully');
        
        markDataLoaded();
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      
      // More specific error handling for production
      if (error.message.includes('CORS')) {
        setError('Connection issue. Please refresh the page.');
      } else if (error.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError('Unable to load dashboard data. Please try again.');
      }
      
      recordError(error);
    } finally {
      setLoading(false);
      const totalTime = performance.now() - startTime;
      logMetric('dashboard_total_load_time', totalTime);
    }
  }, [markDataLoaded, recordError]);

  // Manual refresh handler
  const handleManualRefresh = () => {
    refreshDashboard();
    fetchDashboardData();
  };
    // Effect for auto-refresh based on triggers
  useEffect(() => {
    fetchDashboardData();
    // Log for debugging
    if (lastRefreshTime) {
      console.log(`Dashboard refreshed due to trigger change. Last refresh: ${new Date(lastRefreshTime).toISOString()}`);
    }
  }, [currentUser, refreshTrigger, lastRefreshTime, fetchDashboardData]);
    // Special effect for arriving from booking page
  useEffect(() => {
    // Check if we need to refresh on arrival (specifically for production)
    const needsRefresh = localStorage.getItem('dashboard_needs_refresh');
    if (needsRefresh === 'true') {
      console.log('Detected return from booking page, forcing refresh');
      fetchDashboardData();
      localStorage.removeItem('dashboard_needs_refresh');
    }
    
    // Direct data injection for when a new booking was just created
    const newBookingCreated = localStorage.getItem('new_booking_created');
    if (newBookingCreated === 'true') {
      console.log('New booking detected, injecting data directly');
      
      // Get the latest booking data
      const latestBookingJSON = localStorage.getItem('latest_booking');
      if (latestBookingJSON) {
        try {
          const latestBooking = JSON.parse(latestBookingJSON);
          
          // Update stats instantly
          setStats(prev => ({
            pendingBookings: (prev.pendingBookings || 0) + 1,
            confirmedBookings: prev.confirmedBookings || 0,
            totalBookings: (prev.totalBookings || 0) + 1
          }));
          
          // Add the booking to recent bookings
          setRecentBookings(prev => [latestBooking, ...prev].slice(0, 5));
          
          // Don't remove the flag here, let MyBookings component also use it
          setLastUpdated(new Date().toLocaleTimeString() + ' (New Booking Added)');
        } catch (e) {
          console.error('Error parsing latest booking:', e);
        }
      }
      
      // Still fetch from API after a delay to ensure data consistency
      setTimeout(() => {
        fetchDashboardData();
      }, 1000);
    }
  }, [fetchDashboardData]);
  
  // Simplified effect for URL parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const updatedParam = queryParams.get('updated');
    
    if (updatedParam) {
      console.log('Dashboard loaded after booking completion');
      fetchDashboardData();
    }
  }, [location.search, fetchDashboardData]);

  // Effect for subscribing to booking events
  useEffect(() => {
    // Subscribe to booking events
    const unsubscribe = bookingEvents.on('booking_created', (bookingData) => {
      console.log('BookingEventEmitter: booking_created event received', bookingData);
      setRefreshSource('event_emitter');
      
      // Immediately update UI with new booking data
      setStats(prev => ({
        pendingBookings: (prev.pendingBookings || 0) + 1,
        confirmedBookings: prev.confirmedBookings || 0,
        totalBookings: (prev.totalBookings || 0) + 1
      }));
      
      // Add the booking to recent bookings at the top
      setRecentBookings(prev => [bookingData, ...prev].slice(0, 5));
      
      setLastUpdated(new Date().toLocaleTimeString() + ' (Live Update)');
      
      // Refetch from API after a short delay
      setTimeout(() => fetchDashboardData(), 500);
    });
    
    return () => {
      unsubscribe();
    };
  }, [fetchDashboardData]);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout title="Dashboard">
      <div>        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, {currentUser?.name || 'User'}!</h2>
            <p className="text-gray-600">Here's an overview of your bookings and activities.</p>
            {lastUpdated && <p className="text-xs text-gray-500">Last updated: {lastUpdated}</p>}
          </div>
          <button 
            onClick={handleManualRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
              </span>
            ) : (
              <span>Refresh Dashboard</span>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Pending Bookings</p>
                    <h3 className="text-3xl font-bold text-blue-800 mt-1">{stats.pendingBookings}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <i className="fas fa-clock text-blue-500"></i>
                  </div>
                </div>
                <Link to="/dashboard/bookings" className="text-blue-600 text-sm flex items-center mt-4 hover:underline">
                  View pending <i className="fas fa-arrow-right ml-1 text-xs"></i>
                </Link>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Confirmed Bookings</p>
                    <h3 className="text-3xl font-bold text-green-800 mt-1">{stats.confirmedBookings}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <i className="fas fa-check text-green-500"></i>
                  </div>
                </div>
                <Link to="/dashboard/bookings" className="text-green-600 text-sm flex items-center mt-4 hover:underline">
                  View confirmed <i className="fas fa-arrow-right ml-1 text-xs"></i>
                </Link>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Total Bookings</p>
                    <h3 className="text-3xl font-bold text-purple-800 mt-1">{stats.totalBookings}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <i className="fas fa-calendar-alt text-purple-500"></i>
                  </div>
                </div>
                <Link to="/dashboard/history" className="text-purple-600 text-sm flex items-center mt-4 hover:underline">
                  View history <i className="fas fa-arrow-right ml-1 text-xs"></i>
                </Link>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Recent Bookings</h3>
                <Link to="/dashboard/bookings" className="text-blue-600 text-sm hover:underline">
                  View all
                </Link>
              </div>

              <div className="bg-gray-50 rounded-lg overflow-hidden">
                {recentBookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentBookings.map((booking) => (
                          <tr key={booking._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{booking.activity?.title || "Unknown Activity"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">
                                {formatDate(booking.date)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">${booking.totalPrice}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No recent bookings found</p>
                    <Link to="/activities" className="mt-2 inline-block text-blue-600 hover:underline">
                      Browse activities
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link to="/activities" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <i className="fas fa-compass text-blue-500"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-gray-800 font-medium">Browse Activities</h4>
                      <p className="text-gray-500 text-sm">Discover new experiences</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/dashboard/profile" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <i className="fas fa-user-edit text-purple-500"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-gray-800 font-medium">Update Profile</h4>
                      <p className="text-gray-500 text-sm">Edit your personal details</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/contact" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full">
                      <i className="fas fa-headset text-green-500"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-gray-800 font-medium">Support</h4>
                      <p className="text-gray-500 text-sm">Get help with your bookings</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
