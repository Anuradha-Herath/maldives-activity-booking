import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminContactSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');

    // Dummy data for contact submissions
    useEffect(() => {
        setTimeout(() => {
            setSubmissions([
                {
                    id: 1,
                    name: 'Alice Cooper',
                    email: 'alice@example.com',
                    phone: '+1234567890',
                    subject: 'Travel Package Inquiry',
                    message: 'I am interested in the Maldives Paradise Getaway package for 4 people. Could you provide more details about the pricing and availability for March 2024?',
                    type: 'travel_inquiry',
                    status: 'new',
                    priority: 'medium',
                    submittedAt: '2024-01-20T14:30:00Z',
                    respondedAt: null,
                    assignedTo: null
                },
                {
                    id: 2,
                    name: 'Bob Martinez',
                    email: 'bob@example.com',
                    phone: '+9876543210',
                    subject: 'Accommodation Booking Help',
                    message: 'I need assistance with booking a villa for my honeymoon. We are looking for something private with overwater features.',
                    type: 'accommodation_inquiry',
                    status: 'in_progress',
                    priority: 'high',
                    submittedAt: '2024-01-19T10:15:00Z',
                    respondedAt: '2024-01-19T15:30:00Z',
                    assignedTo: 'Sarah Admin'
                },
                {
                    id: 3,
                    name: 'Carol Johnson',
                    email: 'carol@example.com',
                    phone: null,
                    subject: 'General Information',
                    message: 'What are your COVID-19 travel restrictions and requirements for international visitors?',
                    type: 'general_inquiry',
                    status: 'resolved',
                    priority: 'low',
                    submittedAt: '2024-01-18T09:45:00Z',
                    respondedAt: '2024-01-18T16:20:00Z',
                    assignedTo: 'Mike Support'
                },
                {
                    id: 4,
                    name: 'David Lee',
                    email: 'david@example.com',
                    phone: '+1122334455',
                    subject: 'Investment Opportunity',
                    message: 'I am interested in your foreign investment consultation services. I am looking to invest in tourism infrastructure in the Maldives.',
                    type: 'investment_inquiry',
                    status: 'new',
                    priority: 'high',
                    submittedAt: '2024-01-21T11:00:00Z',
                    respondedAt: null,
                    assignedTo: null
                },
                {
                    id: 5,
                    name: 'Emily Zhang',
                    email: 'emily@example.com',
                    phone: '+6677889900',
                    subject: 'Brand Representation Request',
                    message: 'Our company would like to explore brand representation opportunities in the Maldives market. Please contact us to discuss partnership possibilities.',
                    type: 'business_inquiry',
                    status: 'in_progress',
                    priority: 'medium',
                    submittedAt: '2024-01-17T13:20:00Z',
                    respondedAt: '2024-01-18T09:10:00Z',
                    assignedTo: 'Tom Business'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleStatusUpdate = (id, newStatus) => {
        setSubmissions(submissions.map(submission => 
            submission.id === id 
                ? { 
                    ...submission, 
                    status: newStatus,
                    respondedAt: newStatus === 'resolved' ? new Date().toISOString() : submission.respondedAt
                  }
                : submission
        ));
    };

    const handleAssignment = (id, assignedTo) => {
        setSubmissions(submissions.map(submission => 
            submission.id === id 
                ? { ...submission, assignedTo, status: assignedTo ? 'in_progress' : 'new' }
                : submission
        ));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            setSubmissions(submissions.filter(submission => submission.id !== id));
        }
    };

    const filteredSubmissions = submissions.filter(submission => {
        const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            submission.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
        const matchesType = filterType === 'all' || submission.type === filterType;
        return matchesSearch && matchesStatus && matchesType;
    });

    const StatusBadge = ({ status }) => {
        const statusStyles = {
            new: 'bg-blue-100 text-blue-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            resolved: 'bg-green-100 text-green-800'
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
                {status.replace('_', ' ')}
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

    const TypeBadge = ({ type }) => {
        const typeStyles = {
            travel_inquiry: 'bg-blue-100 text-blue-800',
            accommodation_inquiry: 'bg-purple-100 text-purple-800',
            general_inquiry: 'bg-gray-100 text-gray-800',
            investment_inquiry: 'bg-green-100 text-green-800',
            business_inquiry: 'bg-orange-100 text-orange-800'
        };
        
        const typeLabels = {
            travel_inquiry: 'Travel Inquiry',
            accommodation_inquiry: 'Accommodation',
            general_inquiry: 'General',
            investment_inquiry: 'Investment',
            business_inquiry: 'Business'
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyles[type]}`}>
                {typeLabels[type]}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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
                        <h1 className="text-2xl font-bold text-gray-900">Contact Form Submissions</h1>
                        <p className="text-gray-600">Manage customer inquiries and contact form submissions</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fas fa-envelope text-blue-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
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
                                    {submissions.filter(s => s.status === 'new').length}
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
                                    {submissions.filter(s => s.status === 'in_progress').length}
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
                                <p className="text-sm font-medium text-gray-600">Resolved</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {submissions.filter(s => s.status === 'resolved').length}
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
                                    placeholder="Search submissions..."
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
                                <option value="new">New</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Types</option>
                                <option value="travel_inquiry">Travel Inquiry</option>
                                <option value="accommodation_inquiry">Accommodation</option>
                                <option value="investment_inquiry">Investment</option>
                                <option value="business_inquiry">Business</option>
                                <option value="general_inquiry">General</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submissions Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subject & Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Message
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Priority
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
                                {filteredSubmissions.map((submission) => (
                                    <tr key={submission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                                                <div className="text-sm text-gray-500">{submission.email}</div>
                                                {submission.phone && (
                                                    <div className="text-sm text-gray-500">{submission.phone}</div>
                                                )}
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {formatDate(submission.submittedAt)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 mb-1">
                                                    {submission.subject}
                                                </div>
                                                <TypeBadge type={submission.type} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs">
                                                <p className="truncate" title={submission.message}>
                                                    {submission.message.length > 100 
                                                        ? `${submission.message.substring(0, 100)}...`
                                                        : submission.message
                                                    }
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <PriorityBadge priority={submission.priority} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <StatusBadge status={submission.status} />
                                                {submission.assignedTo && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Assigned to: {submission.assignedTo}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => alert(`View full details for submission ${submission.id}`)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                {submission.status === 'new' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(submission.id, 'in_progress')}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                        title="Mark In Progress"
                                                    >
                                                        <i className="fas fa-play"></i>
                                                    </button>
                                                )}
                                                {submission.status !== 'resolved' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(submission.id, 'resolved')}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Mark Resolved"
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(submission.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete Submission"
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

                    {filteredSubmissions.length === 0 && (
                        <div className="text-center py-8">
                            <i className="fas fa-envelope-open text-gray-400 text-4xl mb-4"></i>
                            <p className="text-gray-500">No submissions found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminContactSubmissions;
