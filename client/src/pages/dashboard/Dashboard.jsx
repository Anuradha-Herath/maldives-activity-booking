import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // In a real app, these would be fetched from your API
  const stats = {
    pendingBookings: 2,
    confirmedBookings: 3,
    totalBookings: 8
  };
  
  // Most recent bookings
  const recentBookings = [
    {
      id: 'bk1',
      activityName: 'Whale Shark Snorkeling',
      date: '2023-06-15',
      status: 'confirmed',
      price: 149
    },
    {
      id: 'bk2',
      activityName: 'Sunset Dolphin Cruise',
      date: '2023-06-22',
      status: 'pending',
      price: 89
    }
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, {currentUser?.name || 'User'}!</h2>
          <p className="text-gray-600">Here's an overview of your bookings and activities.</p>
        </div>

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
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.activityName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">${booking.price}</div>
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
