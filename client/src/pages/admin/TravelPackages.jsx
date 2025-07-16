import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminTravelPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Dummy data for travel packages
    useEffect(() => {
        setTimeout(() => {
            setPackages([
                {
                    id: 1,
                    title: 'Maldives Paradise Getaway',
                    destination: 'South Male Atoll',
                    duration: '5 days 4 nights',
                    price: 2500,
                    status: 'active',
                    bookings: 25,
                    createdAt: '2024-01-15',
                    category: 'luxury'
                },
                {
                    id: 2,
                    title: 'Romantic Honeymoon Package',
                    destination: 'Baa Atoll',
                    duration: '7 days 6 nights',
                    price: 4200,
                    status: 'active',
                    bookings: 18,
                    createdAt: '2024-01-10',
                    category: 'romance'
                },
                {
                    id: 3,
                    title: 'Family Adventure Package',
                    destination: 'Ari Atoll',
                    duration: '6 days 5 nights',
                    price: 3200,
                    status: 'inactive',
                    bookings: 12,
                    createdAt: '2024-01-05',
                    category: 'family'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleDeletePackage = (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            setPackages(packages.filter(pkg => pkg.id !== id));
        }
    };

    const handleStatusToggle = (id) => {
        setPackages(packages.map(pkg => 
            pkg.id === id 
                ? { ...pkg, status: pkg.status === 'active' ? 'inactive' : 'active' }
                : pkg
        ));
    };

    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || pkg.status === filterStatus;
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
                        <h1 className="text-2xl font-bold text-gray-900">Travel Packages Management</h1>
                        <p className="text-gray-600">Manage tour packages, destinations, and pricing</p>
                    </div>
                    <Link 
                        to="/admin/travel-packages/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add New Package
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fas fa-suitcase text-blue-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Packages</p>
                                <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fas fa-check-circle text-green-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Packages</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {packages.filter(pkg => pkg.status === 'active').length}
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
                                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {packages.reduce((sum, pkg) => sum + pkg.bookings, 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fas fa-dollar-sign text-purple-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Avg. Package Price</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${Math.round(packages.reduce((sum, pkg) => sum + pkg.price, 0) / packages.length)}
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
                                    placeholder="Search packages..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Packages Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Package Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Destination
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bookings
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
                                {filteredPackages.map((pkg) => (
                                    <tr key={pkg.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                                                <div className="text-sm text-gray-500">
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                                                        pkg.category === 'luxury' ? 'bg-purple-100 text-purple-800' :
                                                        pkg.category === 'romance' ? 'bg-pink-100 text-pink-800' :
                                                        'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {pkg.category}
                                                    </span>
                                                    Created: {pkg.createdAt}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {pkg.destination}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {pkg.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${pkg.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className="flex items-center">
                                                <i className="fas fa-users mr-1 text-gray-400"></i>
                                                {pkg.bookings}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={pkg.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/admin/travel-packages/${pkg.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Edit Package"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button
                                                    onClick={() => handleStatusToggle(pkg.id)}
                                                    className={`${pkg.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                                                    title={pkg.status === 'active' ? 'Deactivate' : 'Activate'}
                                                >
                                                    <i className={`fas ${pkg.status === 'active' ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePackage(pkg.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete Package"
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

                    {filteredPackages.length === 0 && (
                        <div className="text-center py-8">
                            <i className="fas fa-suitcase text-gray-400 text-4xl mb-4"></i>
                            <p className="text-gray-500">No packages found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminTravelPackages;
