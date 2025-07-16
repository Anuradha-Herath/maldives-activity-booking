import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');

    // Dummy data for blogs
    useEffect(() => {
        setTimeout(() => {
            setBlogs([
                {
                    id: 1,
                    title: 'Top 10 Must-Visit Destinations in the Maldives',
                    slug: 'top-10-must-visit-destinations-maldives',
                    excerpt: 'Discover the most breathtaking locations across the Maldivian atolls that every traveler should experience.',
                    content: 'Long form content here...',
                    author: 'Travel Editor',
                    category: 'destinations',
                    tags: ['maldives', 'travel', 'destinations', 'guide'],
                    featuredImage: '/images/blog/maldives-destinations.jpg',
                    status: 'published',
                    views: 1250,
                    likes: 89,
                    comments: 23,
                    seoTitle: 'Top 10 Must-Visit Destinations in Maldives | Travel Guide',
                    seoDescription: 'Explore the best destinations in Maldives with our comprehensive travel guide.',
                    publishedAt: '2024-01-15T10:00:00Z',
                    createdAt: '2024-01-14T14:30:00Z'
                },
                {
                    id: 2,
                    title: 'Sustainable Tourism in the Maldives: A Guide for Eco-Conscious Travelers',
                    slug: 'sustainable-tourism-maldives-eco-guide',
                    excerpt: 'Learn how to travel responsibly and support sustainable tourism practices in the Maldives.',
                    content: 'Long form content here...',
                    author: 'Environmental Writer',
                    category: 'sustainability',
                    tags: ['sustainability', 'eco-tourism', 'maldives', 'environment'],
                    featuredImage: '/images/blog/sustainable-tourism.jpg',
                    status: 'published',
                    views: 890,
                    likes: 67,
                    comments: 15,
                    seoTitle: 'Sustainable Tourism in Maldives | Eco Travel Guide',
                    seoDescription: 'Discover how to travel sustainably in the Maldives and support local communities.',
                    publishedAt: '2024-01-10T08:30:00Z',
                    createdAt: '2024-01-09T16:45:00Z'
                },
                {
                    id: 3,
                    title: 'Investment Opportunities in Maldivian Tourism Sector',
                    slug: 'investment-opportunities-maldivian-tourism',
                    excerpt: 'Explore the growing investment potential in the Maldives tourism and hospitality industry.',
                    content: 'Long form content here...',
                    author: 'Business Analyst',
                    category: 'business',
                    tags: ['investment', 'business', 'tourism', 'maldives'],
                    featuredImage: '/images/blog/tourism-investment.jpg',
                    status: 'draft',
                    views: 0,
                    likes: 0,
                    comments: 0,
                    seoTitle: 'Tourism Investment Opportunities in Maldives',
                    seoDescription: 'Discover lucrative investment opportunities in Maldives tourism sector.',
                    publishedAt: null,
                    createdAt: '2024-01-20T11:15:00Z'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleDeleteBlog = (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            setBlogs(blogs.filter(blog => blog.id !== id));
        }
    };

    const handleStatusUpdate = (id, newStatus) => {
        setBlogs(blogs.map(blog => 
            blog.id === id 
                ? { 
                    ...blog, 
                    status: newStatus,
                    publishedAt: newStatus === 'published' ? new Date().toISOString() : blog.publishedAt
                  }
                : blog
        ));
    };

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
        const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const StatusBadge = ({ status }) => {
        const statusStyles = {
            published: 'bg-green-100 text-green-800',
            draft: 'bg-yellow-100 text-yellow-800',
            archived: 'bg-gray-100 text-gray-800'
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
                {status}
            </span>
        );
    };

    const CategoryBadge = ({ category }) => {
        const categoryStyles = {
            destinations: 'bg-blue-100 text-blue-800',
            sustainability: 'bg-green-100 text-green-800',
            business: 'bg-purple-100 text-purple-800',
            activities: 'bg-orange-100 text-orange-800',
            culture: 'bg-pink-100 text-pink-800'
        };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryStyles[category] || 'bg-gray-100 text-gray-800'}`}>
                {category}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not published';
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
                        <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
                        <p className="text-gray-600">Manage travel blogs, articles, and content</p>
                    </div>
                    <Link 
                        to="/admin/blogs/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Create New Blog
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fas fa-blog text-blue-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                                <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fas fa-check-circle text-green-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Published</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {blogs.filter(blog => blog.status === 'published').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <i className="fas fa-edit text-yellow-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Drafts</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {blogs.filter(blog => blog.status === 'draft').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fas fa-eye text-purple-600"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Views</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {blogs.reduce((sum, blog) => sum + blog.views, 0).toLocaleString()}
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
                                    placeholder="Search blogs..."
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
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Categories</option>
                                <option value="destinations">Destinations</option>
                                <option value="sustainability">Sustainability</option>
                                <option value="business">Business</option>
                                <option value="activities">Activities</option>
                                <option value="culture">Culture</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Blogs Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Blog Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Author & Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Engagement
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Published Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredBlogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 mb-1">
                                                    {blog.title}
                                                </div>
                                                <div className="text-sm text-gray-500 max-w-xs">
                                                    {blog.excerpt.length > 100 
                                                        ? `${blog.excerpt.substring(0, 100)}...`
                                                        : blog.excerpt
                                                    }
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {blog.tags.slice(0, 3).map((tag, index) => (
                                                        <span key={index} className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                    {blog.tags.length > 3 && (
                                                        <span className="text-xs text-gray-400">+{blog.tags.length - 3} more</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm text-gray-900">{blog.author}</div>
                                                <div className="mt-1">
                                                    <CategoryBadge category={blog.category} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="space-y-1">
                                                <div className="flex items-center">
                                                    <i className="fas fa-eye mr-1 text-gray-400"></i>
                                                    {blog.views.toLocaleString()}
                                                </div>
                                                <div className="flex items-center">
                                                    <i className="fas fa-heart mr-1 text-gray-400"></i>
                                                    {blog.likes}
                                                </div>
                                                <div className="flex items-center">
                                                    <i className="fas fa-comment mr-1 text-gray-400"></i>
                                                    {blog.comments}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={blog.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(blog.publishedAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/blogs/${blog.slug}`}
                                                    className="text-gray-600 hover:text-gray-900"
                                                    title="View Blog"
                                                    target="_blank"
                                                >
                                                    <i className="fas fa-external-link-alt"></i>
                                                </Link>
                                                <Link
                                                    to={`/admin/blogs/${blog.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Edit Blog"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                {blog.status === 'draft' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(blog.id, 'published')}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Publish Blog"
                                                    >
                                                        <i className="fas fa-play"></i>
                                                    </button>
                                                )}
                                                {blog.status === 'published' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(blog.id, 'draft')}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                        title="Unpublish Blog"
                                                    >
                                                        <i className="fas fa-pause"></i>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteBlog(blog.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete Blog"
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

                    {filteredBlogs.length === 0 && (
                        <div className="text-center py-8">
                            <i className="fas fa-blog text-gray-400 text-4xl mb-4"></i>
                            <p className="text-gray-500">No blog posts found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminBlogs;
