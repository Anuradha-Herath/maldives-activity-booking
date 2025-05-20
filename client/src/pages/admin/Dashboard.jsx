import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalBookings: 0,
    totalUsers: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // For now just simulate API calls with setTimeout
        setTimeout(() => {
          setStats({
            totalActivities: 24,
            totalBookings: 158,
            totalUsers: 423,
            pendingBookings: 17,
          });
          
          setRecentBookings([
            { id: 'BK123', activityName: 'Sunset Cruise', customerName: 'John Smith', date: '2023-12-10', status: 'confirmed', amount: 198 },
            { id: 'BK124', activityName: 'Scuba Diving', customerName: 'Alice Johnson', date: '2023-12-12', status: 'pending', amount: 299 },
            { id: 'BK125', activityName: 'Snorkeling Tour', customerName: 'Robert Davis', date: '2023-12-15', status: 'pending', amount: 149 },
            { id: 'BK126', activityName: 'Fishing Trip', customerName: 'Emma Wilson', date: '2023-12-18', status: 'confirmed', amount: 225 },
          ]);
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Status badge
  const StatusBadge = ({ status }) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="pb-5 border-b border-gray-200 mb-5 flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Activities</dt>
                  <dd className="mt-1 text-3xl font-semibold text-blue-600">{stats.totalActivities}</dd>
                </dl>
                <div className="mt-4">
                  <Link to="/admin/activities" className="text-sm text-blue-500 hover:text-blue-700">View all activities <i className="fas fa-arrow-right ml-1"></i></Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                  <dd className="mt-1 text-3xl font-semibold text-green-600">{stats.totalBookings}</dd>
                </dl>
                <div className="mt-4">
                  <Link to="/admin/bookings" className="text-sm text-blue-500 hover:text-blue-700">Manage bookings <i className="fas fa-arrow-right ml-1"></i></Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="mt-1 text-3xl font-semibold text-indigo-600">{stats.totalUsers}</dd>
                </dl>
                <div className="mt-4">
                  <Link to="/admin/users" className="text-sm text-blue-500 hover:text-blue-700">View users <i className="fas fa-arrow-right ml-1"></i></Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Bookings</dt>
                  <dd className="mt-1 text-3xl font-semibold text-yellow-600">{stats.pendingBookings}</dd>
                </dl>
                <div className="mt-4">
                  <Link to="/admin/bookings?status=pending" className="text-sm text-blue-500 hover:text-blue-700">Review pending <i className="fas fa-arrow-right ml-1"></i></Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
              <Link to="/admin/bookings" className="text-sm text-blue-500 hover:text-blue-700">
                View all <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        <Link to={`/admin/bookings/${booking.id}`}>{booking.id}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.activityName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(booking.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${booking.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <Link 
                  to="/admin/activities/new"
                  className="bg-white border border-gray-200 rounded-md p-5 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center text-center"
                >
                  <div className="text-blue-600 text-3xl mb-3">
                    <i className="fas fa-plus-circle"></i>
                  </div>
                  <h4 className="text-gray-900 font-medium mb-1">Add New Activity</h4>
                  <p className="text-gray-500 text-sm">Create a new activity listing</p>
                </Link>
                
                <Link 
                  to="/admin/bookings?status=pending"
                  className="bg-white border border-gray-200 rounded-md p-5 hover:bg-yellow-50 transition-colors flex flex-col items-center justify-center text-center"
                >
                  <div className="text-yellow-600 text-3xl mb-3">
                    <i className="fas fa-clipboard-check"></i>
                  </div>
                  <h4 className="text-gray-900 font-medium mb-1">Pending Bookings</h4>
                  <p className="text-gray-500 text-sm">Review and approve booking requests</p>
                </Link>
                
                <Link 
                  to="/admin/settings"
                  className="bg-white border border-gray-200 rounded-md p-5 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-center"
                >
                  <div className="text-gray-600 text-3xl mb-3">
                    <i className="fas fa-cog"></i>
                  </div>
                  <h4 className="text-gray-900 font-medium mb-1">Site Settings</h4>
                  <p className="text-gray-500 text-sm">Manage global website settings</p>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
