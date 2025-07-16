import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminCustomPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Dummy data for custom packages
    useEffect(() => {
        setTimeout(() => {
            setPackages([
                {
                    id: 1,
                    title: 'Luxury Honeymoon Experience',
                    customerName: 'John & Sarah Smith',
                    customerEmail: 'john.sarah@example.com',
                    duration: '10 days 9 nights',
                    budget: 15000,
                    pax: 2,
                    preferences: {
                        accommodation: 'Overwater Villa',
                        activities: ['Couples Spa', 'Sunset Cruise', 'Private Dining'],
                        dining: 'Fine Dining preferred',
                        special: 'Anniversary celebration'
                    },
                    status: 'pending_review',
                    priority: 'high',
                    submittedAt: '2024-01-20T14:30:00Z',
                    assignedTo: 'Travel Specialist A',
                    notes: 'Customer is flexible with dates but wants premium experience'
                },
                {
                    id: 2,
                    title: 'Family Adventure Package',
                    customerName: 'Mike Johnson Family',
                    customerEmail: 'mike.j@example.com',
                    duration: '7 days 6 nights',
                    budget: 8000,
                    pax: 4,
                    preferences: {
                        accommodation: 'Family Suite',
                        activities: ['Snorkeling', 'Island Hopping', 'Kids Club'],
                        dining: 'Family-friendly restaurants',
                        special: 'Child-safe activities required'
                    },
                    status: 'in_progress',
                    priority: 'medium',
                    submittedAt: '2024-01-18T09:15:00Z',
                    assignedTo: 'Travel Specialist B',
                    notes: 'Children ages 8 and 12, looking for educational activities'
                },
                {
                    id: 3,
                    title: 'Corporate Retreat Package',
                    customerName: 'TechCorp Inc.',
                    customerEmail: 'hr@techcorp.com',
                    duration: '5 days 4 nights',
                    budget: 25000,
                    pax: 15,
                    preferences: {
                        accommodation: 'Resort with meeting facilities',
                        activities: ['Team Building', 'Water Sports', 'Cultural Tours'],
                        dining: 'Group dining arrangements',
                        special: 'Conference facilities needed'
                    },
                    status: 'quoted',
                    priority: 'high',
                    submittedAt: '2024-01-15T11:00:00Z',
                    assignedTo: 'Corporate Specialist',
                    notes: 'Flexible dates in Q2 2024, need detailed proposal'
                },
                {
                    id: 4,
                    title: 'Solo Wellness Retreat',
                    customerName: 'Emma Davis',
                    customerEmail: 'emma.wellness@example.com',
                    duration: '8 days 7 nights',
                    budget: 6000,
                    pax: 1,
                    preferences: {
                        accommodation: 'Peaceful villa with garden view',
                        activities: ['Spa Treatments', 'Yoga', 'Meditation'],
                        dining: 'Healthy cuisine options',
                        special: 'Wellness and relaxation focus'
                    },
                    status: 'confirmed',
                    priority: 'medium',
                    submittedAt: '2024-01-12T16:45:00Z',
                    assignedTo: 'Wellness Specialist',
                    notes: 'Customer confirmed package, payment received'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleStatusUpdate = (id, newStatus) => {
        setPackages(packages.map(pkg => 
            pkg.id === id 
                ? { ...pkg, status: newStatus }
                : pkg
        ));
    };

    const handleAssignment = (id, assignedTo) => {
        setPackages(packages.map(pkg => 
            pkg.id === id 
                ? { ...pkg, assignedTo, status: assignedTo ? 'in_progress' : 'pending_review' }
                : pkg
        ));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this custom package request?')) {
            setPackages(packages.filter(pkg => pkg.id !== id));
        }
    };

    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pkg.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pkg.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const StatusBadge = ({ status }) => {
        const statusStyles = {
            pending_review: 'bg-blue-100 text-blue-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            quoted: 'bg-purple-100 text-purple-800',
            confirmed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        
        const statusLabels = {
            pending_review: 'Pending Review',
            in_progress: 'In Progress',
            quoted: 'Quoted',
            confirmed: 'Confirmed',
            cancelled: 'Cancelled'
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
                {statusLabels[status]}
            </span>
        );
    };

    const PriorityBadge = ({ priority }) => {
        const priorityStyles = {
            low: 'bg-gray-100 text-gray-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800'
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles[priority]}`}>
                {priority}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

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
                        <h1 className="text-2xl font-bold text-gray-900">Custom Package Requests</h1>
                        <p className="text-gray-600">Manage custom travel package requests and quotations</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fas fa-clipboard-list text-blue-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <i className="fas fa-clock text-yellow-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {packages.filter(pkg => pkg.status === 'pending_review').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fas fa-check-circle text-green-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {packages.filter(pkg => pkg.status === 'confirmed').length}
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
                                <p className="text-sm font-medium text-gray-600">Total Value</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${packages.reduce((sum, pkg) => sum + pkg.budget, 0).toLocaleString()}
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
                                <option value="pending_review">Pending Review</option>
                                <option value="in_progress">In Progress</option>
                                <option value="quoted">Quoted</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
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
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Requirements
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Budget & Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Assigned To
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPackages.map((pkg) => (
                                    <tr key={pkg.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                                                <div className="text-sm text-gray-500">
                                                    {pkg.duration} • {pkg.pax} pax
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Submitted: {formatDate(pkg.submittedAt)}
                                                </div>
                                                <div className="mt-1">
                                                    <PriorityBadge priority={pkg.priority} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{pkg.customerName}</div>
                                                <div className="text-sm text-gray-500">{pkg.customerEmail}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs">
                                                <div><strong>Accommodation:</strong> {pkg.preferences.accommodation}</div>
                                                <div><strong>Activities:</strong> {pkg.preferences.activities.slice(0, 2).join(', ')}</div>
                                                {pkg.preferences.activities.length > 2 && (
                                                    <div className="text-xs text-gray-500">+{pkg.preferences.activities.length - 2} more</div>
                                                )}
                                                {pkg.preferences.special && (
                                                    <div className="text-xs text-blue-600 mt-1">
                                                        <i className="fas fa-star mr-1"></i>
                                                        {pkg.preferences.special}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    ${pkg.budget.toLocaleString()}
                                                </div>
                                                <div className="mt-1">
                                                    <StatusBadge status={pkg.status} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {pkg.assignedTo || (
                                                <span className="text-gray-400 italic">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => alert(`View full details for package ${pkg.id}`)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                {pkg.status === 'pending_review' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(pkg.id, 'in_progress')}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                        title="Start Processing"
                                                    >
                                                        <i className="fas fa-play"></i>
                                                    </button>
                                                )}
                                                {(pkg.status === 'in_progress' || pkg.status === 'pending_review') && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(pkg.id, 'quoted')}
                                                        className="text-purple-600 hover:text-purple-900"
                                                        title="Send Quote"
                                                    >
                                                        <i className="fas fa-file-invoice-dollar"></i>
                                                    </button>
                                                )}
                                                {pkg.status === 'quoted' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(pkg.id, 'confirmed')}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Confirm Booking"
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(pkg.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete Request"
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
                            <i className="fas fa-clipboard-list text-gray-400 text-4xl mb-4"></i>
                            <p className="text-gray-500">No custom package requests found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCustomPackages;
