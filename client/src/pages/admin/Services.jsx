import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterService, setFilterService] = useState('all');

    // Dummy data for service inquiries
    useEffect(() => {
        setTimeout(() => {
            setServices([
                {
                    id: 1,
                    serviceType: 'real_estate',
                    clientName: 'Global Properties Ltd',
                    clientEmail: 'contact@globalproperties.com',
                    contactPerson: 'Robert Chen',
                    phone: '+1234567890',
                    inquiry: 'Looking for investment opportunities in Maldivian real estate market. Interested in resort development projects.',
                    budget: 5000000,
                    timeline: '6-12 months',
                    status: 'new',
                    priority: 'high',
                    submittedAt: '2024-01-20T14:30:00Z',
                    assignedTo: null,
                    lastContact: null
                },
                {
                    id: 2,
                    serviceType: 'foreign_investment',
                    clientName: 'Euro Investment Group',
                    clientEmail: 'info@euroinvest.com',
                    contactPerson: 'Maria Gonzalez',
                    phone: '+34123456789',
                    inquiry: 'Seeking guidance for establishing a tourism infrastructure company in the Maldives. Need assistance with legal requirements and local partnerships.',
                    budget: 2500000,
                    timeline: '3-6 months',
                    status: 'in_progress',
                    priority: 'high',
                    submittedAt: '2024-01-18T09:15:00Z',
                    assignedTo: 'Investment Consultant A',
                    lastContact: '2024-01-19T16:30:00Z'
                },
                {
                    id: 3,
                    serviceType: 'brand_representation',
                    clientName: 'Luxury Lifestyle Brands',
                    clientEmail: 'partnerships@luxurylifestyle.com',
                    contactPerson: 'James Williams',
                    phone: '+44123456789',
                    inquiry: 'International luxury brand seeking local representation in Maldives market. Focus on high-end hospitality products and services.',
                    budget: 150000,
                    timeline: '1-3 months',
                    status: 'quoted',
                    priority: 'medium',
                    submittedAt: '2024-01-15T11:00:00Z',
                    assignedTo: 'Brand Specialist B',
                    lastContact: '2024-01-20T10:45:00Z'
                },
                {
                    id: 4,
                    serviceType: 'tourism_facilities',
                    clientName: 'Sustainable Resorts Inc',
                    clientEmail: 'development@sustainableresorts.com',
                    contactPerson: 'Dr. Sarah Johnson',
                    phone: '+1987654321',
                    inquiry: 'Planning to develop an eco-friendly resort with sustainable tourism facilities. Need comprehensive development consultation.',
                    budget: 8500000,
                    timeline: '12-18 months',
                    status: 'consulting',
                    priority: 'high',
                    submittedAt: '2024-01-12T16:45:00Z',
                    assignedTo: 'Development Consultant',
                    lastContact: '2024-01-21T14:20:00Z'
                },
                {
                    id: 5,
                    serviceType: 'media_advertising',
                    clientName: 'Tourism Board Initiative',
                    clientEmail: 'marketing@tourismboard.mv',
                    contactPerson: 'Ahmed Hassan',
                    phone: '+960123456',
                    inquiry: 'Need comprehensive media and advertising campaign for promoting Maldives as a sustainable tourism destination.',
                    budget: 500000,
                    timeline: '2-4 months',
                    status: 'completed',
                    priority: 'medium',
                    submittedAt: '2024-01-05T13:20:00Z',
                    assignedTo: 'Media Specialist',
                    lastContact: '2024-01-15T11:30:00Z'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleStatusUpdate = (id, newStatus) => {
        setServices(services.map(service => 
            service.id === id 
                ? { 
                    ...service, 
                    status: newStatus,
                    lastContact: new Date().toISOString()
                  }
                : service
        ));
    };

    const handleAssignment = (id, assignedTo) => {
        setServices(services.map(service => 
            service.id === id 
                ? { ...service, assignedTo, status: assignedTo ? 'in_progress' : 'new' }
                : service
        ));
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = service.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            service.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            service.inquiry.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterService === 'all' || service.serviceType === filterService;
        return matchesSearch && matchesFilter;
    });

    const StatusBadge = ({ status }) => {
        const statusStyles = {
            new: 'bg-blue-100 text-blue-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            quoted: 'bg-purple-100 text-purple-800',
            consulting: 'bg-orange-100 text-orange-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        
        const statusLabels = {
            new: 'New',
            in_progress: 'In Progress',
            quoted: 'Quoted',
            consulting: 'Consulting',
            completed: 'Completed',
            cancelled: 'Cancelled'
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
                {statusLabels[status]}
            </span>
        );
    };

    const ServiceTypeBadge = ({ type }) => {
        const typeStyles = {
            real_estate: 'bg-blue-100 text-blue-800',
            foreign_investment: 'bg-green-100 text-green-800',
            brand_representation: 'bg-purple-100 text-purple-800',
            tourism_facilities: 'bg-orange-100 text-orange-800',
            media_advertising: 'bg-pink-100 text-pink-800'
        };
        
        const typeLabels = {
            real_estate: 'Real Estate',
            foreign_investment: 'Foreign Investment',
            brand_representation: 'Brand Representation',
            tourism_facilities: 'Tourism Facilities',
            media_advertising: 'Media & Advertising'
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyles[type]}`}>
                {typeLabels[type]}
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
        if (!dateString) return 'Never';
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
                        <h1 className="text-2xl font-bold text-gray-900">Service Inquiries Management</h1>
                        <p className="text-gray-600">Manage business service inquiries and consultations</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fas fa-handshake text-blue-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fas fa-exclamation-circle text-blue-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">New</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {services.filter(s => s.status === 'new').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <i className="fas fa-clock text-yellow-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">In Progress</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {services.filter(s => s.status === 'in_progress' || s.status === 'consulting').length}
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
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {services.filter(s => s.status === 'completed').length}
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
                                <p className="text-xl font-bold text-gray-900">
                                    ${(services.reduce((sum, s) => sum + s.budget, 0) / 1000000).toFixed(1)}M
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
                                    placeholder="Search inquiries..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <select
                                value={filterService}
                                onChange={(e) => setFilterService(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Services</option>
                                <option value="real_estate">Real Estate</option>
                                <option value="foreign_investment">Foreign Investment</option>
                                <option value="brand_representation">Brand Representation</option>
                                <option value="tourism_facilities">Tourism Facilities</option>
                                <option value="media_advertising">Media & Advertising</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Services Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Service & Inquiry
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Budget & Timeline
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status & Priority
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
                                {filteredServices.map((service) => (
                                    <tr key={service.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{service.clientName}</div>
                                                <div className="text-sm text-gray-500">{service.contactPerson}</div>
                                                <div className="text-sm text-gray-500">{service.clientEmail}</div>
                                                <div className="text-sm text-gray-500">{service.phone}</div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Submitted: {formatDate(service.submittedAt)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="mb-2">
                                                    <ServiceTypeBadge type={service.serviceType} />
                                                </div>
                                                <div className="text-sm text-gray-900 max-w-xs">
                                                    {service.inquiry.length > 120 
                                                        ? `${service.inquiry.substring(0, 120)}...`
                                                        : service.inquiry
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    ${service.budget.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Timeline: {service.timeline}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="mb-1">
                                                    <StatusBadge status={service.status} />
                                                </div>
                                                <PriorityBadge priority={service.priority} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm text-gray-900">
                                                    {service.assignedTo || (
                                                        <span className="text-gray-400 italic">Unassigned</span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Last contact: {formatDate(service.lastContact)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => alert(`View full details for inquiry ${service.id}`)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                {service.status === 'new' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(service.id, 'in_progress')}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                        title="Start Processing"
                                                    >
                                                        <i className="fas fa-play"></i>
                                                    </button>
                                                )}
                                                {(service.status === 'in_progress' || service.status === 'new') && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(service.id, 'quoted')}
                                                        className="text-purple-600 hover:text-purple-900"
                                                        title="Send Quote"
                                                    >
                                                        <i className="fas fa-file-invoice-dollar"></i>
                                                    </button>
                                                )}
                                                {service.status !== 'completed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(service.id, 'completed')}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Mark Complete"
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => alert(`Contact client: ${service.clientEmail}`)}
                                                    className="text-gray-600 hover:text-gray-900"
                                                    title="Contact Client"
                                                >
                                                    <i className="fas fa-envelope"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="text-center py-8">
                            <i className="fas fa-handshake text-gray-400 text-4xl mb-4"></i>
                            <p className="text-gray-500">No service inquiries found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminServices;
