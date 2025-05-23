import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { dashboardAPI } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalBookings: 0,
    totalUsers: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await dashboardAPI.getStats();
      
      if (response.data.success) {
        const { 
          totalActivities, 
          totalBookings, 
          totalUsers, 
          pendingBookings, 
          recentBookings 
        } = response.data.data;
        
        setStats({
          totalActivities,
          totalBookings,
          totalUsers,
          pendingBookings
        });
        
        setRecentBookings(recentBookings);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Error connecting to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Status badge
  const StatusBadge = ({ status }) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800 border border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border border-red-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="pb-5 border-b border-gray-200 mb-6 flex justify-between items-center bg-gradient-to-r from-white to-blue-50 p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, Admin</p>
        </div>
        <div className="text-sm bg-white py-2 px-3 rounded-md shadow-sm border border-gray-100 text-gray-600">
          <i className="far fa-calendar-alt mr-2"></i>
          {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button 
                  onClick={() => setError('')}
                  className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg border border-gray-50">
              <div className="px-5 py-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <i className="fas fa-hiking text-blue-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-blue-50 py-1 px-2 rounded-md">Activities</span>
                </div>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Activities</dt>
                  <dd className="mt-2 text-3xl font-extrabold text-blue-600">{stats.totalActivities}</dd>
                </dl>
                <div className="mt-5">
                  <Link to="/admin/activities" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    View all activities 
                    <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg border border-gray-50">
              <div className="px-5 py-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <i className="fas fa-calendar-check text-green-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-green-50 py-1 px-2 rounded-md">Bookings</span>
                </div>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                  <dd className="mt-2 text-3xl font-extrabold text-green-600">{stats.totalBookings}</dd>
                </dl>
                <div className="mt-5">
                  <Link to="/admin/bookings" className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                    Manage bookings 
                    <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg border border-gray-50">
              <div className="px-5 py-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <i className="fas fa-users text-indigo-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-indigo-50 py-1 px-2 rounded-md">Users</span>
                </div>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="mt-2 text-3xl font-extrabold text-indigo-600">{stats.totalUsers}</dd>
                </dl>
                <div className="mt-5">
                  <Link to="/admin/users" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    View users 
                    <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg border border-gray-50">
              <div className="px-5 py-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <i className="fas fa-clock text-yellow-600 text-xl"></i>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-yellow-50 py-1 px-2 rounded-md">Pending</span>
                </div>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Bookings</dt>
                  <dd className="mt-2 text-3xl font-extrabold text-yellow-600">{stats.pendingBookings}</dd>
                </dl>
                <div className="mt-5">
                  <Link to="/admin/bookings?status=pending" className="text-sm text-yellow-600 hover:text-yellow-800 font-medium flex items-center">
                    Review pending 
                    <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white shadow-md rounded-lg mb-8 border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-white to-blue-50">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
                <p className="text-sm text-gray-500 mt-1">Latest activity on your platform</p>
              </div>
              <Link to="/admin/bookings" className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center">
                View all 
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
            {recentBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Activity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          <Link to={`/admin/bookings/${booking._id}`} className="hover:underline">{booking.bookingReference}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.activity ? booking.activity.title : 'Unknown Activity'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.fullName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{formatDate(booking.date)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${booking.totalPrice}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 px-4 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <i className="fas fa-calendar-day text-blue-500 text-xl"></i>
                </div>
                <p className="text-gray-500 font-medium">No recent bookings found.</p>
                <p className="text-gray-400 text-sm mt-1">New bookings will appear here when created.</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow-md rounded-lg border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-blue-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
              <p className="text-sm text-gray-500 mt-1">Shortcuts to common tasks</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link 
                  to="/admin/activities/new"
                  className="group bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center"
                >
                  <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-200">
                    <i className="fas fa-plus-circle text-2xl"></i>
                  </div>
                  <h4 className="text-gray-900 font-semibold mb-2">Add New Activity</h4>
                  <p className="text-gray-500 text-sm">Create a new activity listing for your customers</p>
                </Link>
                
                <Link 
                  to="/admin/bookings?status=pending"
                  className="group bg-gradient-to-br from-yellow-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center"
                >
                  <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-200">
                    <i className="fas fa-clipboard-check text-2xl"></i>
                  </div>
                  <h4 className="text-gray-900 font-semibold mb-2">Pending Bookings</h4>
                  <p className="text-gray-500 text-sm">Review and approve booking requests from customers</p>
                </Link>
                
                <Link 
                  to="/admin/settings"
                  className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center"
                >
                  <div className="bg-gray-100 text-gray-600 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-200">
                    <i className="fas fa-cog text-2xl"></i>
                  </div>
                  <h4 className="text-gray-900 font-semibold mb-2">Site Settings</h4>
                  <p className="text-gray-500 text-sm">Configure and manage global website settings</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={fetchDashboardData}
              className="inline-flex items-center px-5 py-2.5 border border-blue-300 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Dashboard Data
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
