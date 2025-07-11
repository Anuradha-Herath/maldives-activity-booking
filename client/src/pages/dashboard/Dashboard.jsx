import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardDebugger from '../../components/dashboard/DashboardDebugger';
import { useAuth } from '../../contexts/AuthContext';
import { userBookingsAPI } from '../../utils/api';

const Dashboard = () => {  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    pendingBookings: 0,
    confirmedBookings: 0,
    totalBookings: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Check for authentication token
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No authentication token found when trying to fetch dashboard data');
        } else {
          console.log('Token exists, attempting to fetch dashboard data');
        }
        
        const response = await userBookingsAPI.getStats();
        
        if (response.data.success) {
          console.log('Dashboard data fetched successfully:', response.data.data);
          const { 
            pendingBookings, 
            confirmedBookings, 
            totalBookings,
            recentBookings 
          } = response.data.data;
          
          setStats({
            pendingBookings,
            confirmedBookings,
            totalBookings
          });
          
          setRecentBookings(recentBookings);
          setError('');
        } else {
          console.error('API returned success:false when fetching dashboard data');
          setError('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Error connecting to the server. Please try again.');
        
        // If the error is likely due to authentication or connection issues, retry after delay
        if (retryCount < 3) {
          console.log(`Retrying dashboard data fetch (attempt ${retryCount + 1} of 3)...`);
          setTimeout(() => {
            setRetryCount(prevCount => prevCount + 1);
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [currentUser, retryCount]);
  
  // Add manual refresh function for users to retry getting their data
  const handleManualRefresh = () => {
    setError('');
    setRetryCount(prevCount => prevCount + 1);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout title="Dashboard">
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, {currentUser?.name || 'User'}!</h2>
          <p className="text-gray-600">Here's an overview of your bookings and activities.</p>
        </div>        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex justify-between items-start">
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
              <button 
                onClick={handleManualRefresh} 
                className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
              >
                Refresh Data
              </button>
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
        )}      </div>
      {/* Hidden debugger that can be activated with Alt+D */}
      <DashboardDebugger />
    </DashboardLayout>
  );
};

export default Dashboard;
