import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminAccommodation = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    // Dummy data for accommodations
    useEffect(() => {
        setTimeout(() => {
            setAccommodations([
                {
                    id: 1,
                    name: 'Paradise Island Resort',
                    type: 'resort',
                    location: 'South Male Atoll',
                    rooms: 120,
                    rating: 4.8,
                    priceRange: '$500-$2000',
                    status: 'active',
                    bookings: 45,
                    amenities: ['spa', 'restaurant', 'pool', 'beach'],
                    createdAt: '2024-01-15'
                },
                {
                    id: 2,
                    name: 'Ocean Villa Retreat',
                    type: 'villa',
                    location: 'Baa Atoll',
                    rooms: 24,
                    rating: 4.9,
                    priceRange: '$800-$3500',
                    status: 'active',
                    bookings: 28,
                    amenities: ['private_pool', 'butler', 'beach', 'restaurant'],
                    createdAt: '2024-01-10'
                },
                {
                    id: 3,
                    name: 'Coral Bay Hotel',
                    type: 'hotel',
                    location: 'Ari Atoll',
                    rooms: 85,
                    rating: 4.5,
                    priceRange: '$300-$800',
                    status: 'inactive',
                    bookings: 22,
                    amenities: ['restaurant', 'pool', 'gym', 'spa'],
                    createdAt: '2024-01-05'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleDeleteAccommodation = (id) => {
        if (window.confirm('Are you sure you want to delete this accommodation?')) {
            setAccommodations(accommodations.filter(acc => acc.id !== id));
        }
    };

    const handleStatusToggle = (id) => {
        setAccommodations(accommodations.map(acc => 
            acc.id === id 
                ? { ...acc, status: acc.status === 'active' ? 'inactive' : 'active' }
                : acc
        ));
    };

    const filteredAccommodations = accommodations.filter(acc => {
        const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            acc.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || acc.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const StatusBadge = ({ status }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
        }`}>
            {status}
        </span>
    );

    const TypeBadge = ({ type }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            type === 'resort' ? 'bg-blue-100 text-blue-800' :
            type === 'villa' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'
        }`}>
            {type}
        </span>
    );

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Accommodation Management</h1>
                        <p className="text-gray-600">Manage resorts, hotels, villas and room details</p>
                    </div>
                    <Link 
                        to="/admin/accommodation/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add New Property
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fas fa-building text-blue-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                                <p className="text-2xl font-bold text-gray-900">{accommodations.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fas fa-bed text-green-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {accommodations.reduce((sum, acc) => sum + acc.rooms, 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <i className="fas fa-calendar-check text-yellow-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {accommodations.reduce((sum, acc) => sum + acc.bookings, 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fas fa-star text-purple-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {(accommodations.reduce((sum, acc) => sum + acc.rating, 0) / accommodations.length).toFixed(1)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex-1 md:max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search properties..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Types</option>
                                <option value="resort">Resort</option>
                                <option value="hotel">Hotel</option>
                                <option value="villa">Villa</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Accommodations Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Property Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rooms
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rating
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price Range
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAccommodations.map((acc) => (
                                    <tr key={acc.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{acc.name}</div>
                                                <div className="text-sm text-gray-500 flex items-center space-x-2">
                                                    <TypeBadge type={acc.type} />
                                                    <span>•</span>
                                                    <span>{acc.bookings} bookings</span>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Amenities: {acc.amenities.slice(0, 2).join(', ')}
                                                    {acc.amenities.length > 2 && ` +${acc.amenities.length - 2} more`}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <i className="fas fa-map-marker-alt text-gray-400 mr-1"></i>
                                            {acc.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className="flex items-center">
                                                <i className="fas fa-bed mr-1 text-gray-400"></i>
                                                {acc.rooms}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className="flex items-center">
                                                <i className="fas fa-star text-yellow-400 mr-1"></i>
                                                {acc.rating}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {acc.priceRange}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={acc.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/admin/accommodation/${acc.id}/rooms`}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Manage Rooms"
                                                >
                                                    <i className="fas fa-door-open"></i>
                                                </Link>
                                                <Link
                                                    to={`/admin/accommodation/${acc.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Edit Property"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button
                                                    onClick={() => handleStatusToggle(acc.id)}
                                                    className={`${acc.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                                                    title={acc.status === 'active' ? 'Deactivate' : 'Activate'}
                                                >
                                                    <i className={`fas ${acc.status === 'active' ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAccommodation(acc.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete Property"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredAccommodations.length === 0 && (
                        <div className="text-center py-8">
                            <i className="fas fa-building text-gray-400 text-4xl mb-4"></i>
                            <p className="text-gray-500">No accommodations found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminAccommodation;
