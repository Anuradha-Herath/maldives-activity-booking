import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Get status from URL parameter
    const statusParam = searchParams.get('status');
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
    
    const fetchBookings = async () => {
      try {
        // In a real app, this would be an API call
        // For now just simulate API call with setTimeout
        setTimeout(() => {
          const mockBookings = [
            { id: 'BK001', activityName: 'Scuba Diving Experience', customerName: 'John Smith', customerEmail: 'john@example.com', date: '2023-12-15', time: '09:00 AM', guests: 2, status: 'confirmed', amount: 298, phoneNumber: '+1234567890' },
            { id: 'BK002', activityName: 'Sunset Dolphin Cruise', customerName: 'Alice Johnson', customerEmail: 'alice@example.com', date: '2023-12-16', time: '04:30 PM', guests: 4, status: 'pending', amount: 356, phoneNumber: '+1987654321' },
            { id: 'BK003', activityName: 'Snorkeling with Manta Rays', customerName: 'Robert Davis', customerEmail: 'robert@example.com', date: '2023-12-18', time: '10:00 AM', guests: 3, status: 'confirmed', amount: 387, phoneNumber: '+1122334455' },
            { id: 'BK004', activityName: 'Island Hopping Tour', customerName: 'Emma Wilson', customerEmail: 'emma@example.com', date: '2023-12-20', time: '09:30 AM', guests: 2, status: 'cancelled', amount: 398, phoneNumber: '+1555666777' },
            { id: 'BK005', activityName: 'Traditional Cooking Class', customerName: 'Michael Brown', customerEmail: 'michael@example.com', date: '2023-12-22', time: '11:00 AM', guests: 1, status: 'pending', amount: 79, phoneNumber: '+1888999000' },
            { id: 'BK006', activityName: 'Scuba Diving Experience', customerName: 'Sophia Lee', customerEmail: 'sophia@example.com', date: '2023-12-23', time: '09:00 AM', guests: 2, status: 'pending', amount: 298, phoneNumber: '+1333444555' },
            { id: 'BK007', activityName: 'Full Day Sandbank Picnic', customerName: 'William Miller', customerEmail: 'william@example.com', date: '2023-12-25', time: '10:00 AM', guests: 5, status: 'confirmed', amount: 745, phoneNumber: '+1666777888' },
          ];
          setBookings(mockBookings);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [searchParams]);

  // Filter bookings based on search and status filter
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // If "all" is selected, return all bookings that match search
    if (selectedStatus === 'all') return matchesSearch;
    
    // Otherwise, return bookings that match both search and selected status
    return matchesSearch && booking.status === selectedStatus;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Status badge component
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

  // Handle booking status change
  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(
      bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus } 
          : booking
      )
    );
  };

  return (
    <AdminLayout>
      <div className="pb-5 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Bookings</h1>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="search" className="sr-only">Search Bookings</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by booking ID, activity or customer name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="statusFilter" className="sr-only">Filter by Status</label>
              <select
                id="statusFilter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateFilter" className="sr-only">Filter by Date</label>
              <select
                id="dateFilter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="thisWeek">This Week</option>
                <option value="nextWeek">Next Week</option>
                <option value="thisMonth">This Month</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg">
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
                    Guests
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        <Link to={`/admin/bookings/${booking.id}`}>{booking.id}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.activityName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(booking.date)}</div>
                        <div className="text-sm text-gray-500">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.guests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${booking.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {booking.status === 'pending' && (
                          <div className="space-x-2">
                            <button
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                        {booking.status === 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Reactivate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBookings;
