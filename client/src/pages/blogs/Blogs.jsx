import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Dummy blog data
    const blogs = [
        {
            id: 1,
            title: "Top 10 Must-Visit Islands in the Maldives",
            excerpt: "Discover the most breathtaking islands that offer unique experiences, from luxury resorts to local cultural immersion.",
            author: "Sarah Johnson",
            publishDate: "2024-01-15",
            category: "Travel Guide",
            readTime: "8 min read",
            image: "/images/blog-islands.jpg",
            tags: ["Islands", "Travel", "Tourism"]
        },
        {
            id: 2,
            title: "Maldivian Cuisine: A Culinary Journey",
            excerpt: "Explore the rich flavors and traditional dishes of the Maldives, from fresh seafood to tropical fruits.",
            author: "Ahmed Hassan",
            publishDate: "2024-01-12",
            category: "Culture",
            readTime: "6 min read",
            image: "/images/blog-cuisine.jpg",
            tags: ["Food", "Culture", "Local"]
        },
        {
            id: 3,
            title: "Best Water Sports Activities in the Maldives",
            excerpt: "From snorkeling to windsurfing, discover the thrilling water sports that make the Maldives an adventure paradise.",
            author: "Mike Chen",
            publishDate: "2024-01-10",
            category: "Adventure",
            readTime: "7 min read",
            image: "/images/blog-watersports.jpg",
            tags: ["Water Sports", "Adventure", "Activities"]
        },
        {
            id: 4,
            title: "Sustainable Tourism in the Maldives",
            excerpt: "Learn about eco-friendly travel practices and how to minimize your environmental impact while visiting the Maldives.",
            author: "Emma Green",
            publishDate: "2024-01-08",
            category: "Sustainability",
            readTime: "5 min read",
            image: "/images/blog-sustainability.jpg",
            tags: ["Sustainability", "Environment", "Responsible Travel"]
        },
        {
            id: 5,
            title: "Planning Your Perfect Maldives Honeymoon",
            excerpt: "Essential tips and romantic destinations for couples planning their dream honeymoon in the Maldives.",
            author: "Lisa Wang",
            publishDate: "2024-01-05",
            category: "Romance",
            readTime: "9 min read",
            image: "/images/blog-honeymoon.jpg",
            tags: ["Honeymoon", "Romance", "Couples"]
        }
    ];

    const categories = ['all', 'Travel Guide', 'Culture', 'Adventure', 'Sustainability', 'Romance'];

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Travel Blog</h1>
                    <p className="text-xl">Discover insights, tips, and stories about the Maldives</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search Blogs</label>
                            <input
                                type="text"
                                placeholder="Search by title, content, or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                            selectedCategory === category
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {category === 'all' ? 'All Categories' : category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Blog Button */}
                <div className="mb-8">
                    <Link
                        to="/blogs/create"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
                    >
                        ✍️ Write New Blog
                    </Link>
                </div>

                {/* Blog Listing */}
                <div className="space-y-6">
                    {filteredBlogs.map(blog => (
                        <article key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="md:flex">
                                {/* Blog Image */}
                                <div className="md:w-1/3">
                                    <div className="h-64 md:h-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                                        <span className="text-lg">📸 Blog Image</span>
                                    </div>
                                </div>
                                
                                {/* Blog Content */}
                                <div className="md:w-2/3 p-6">
                                    <div className="flex items-center mb-3">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-3">
                                            {blog.category}
                                        </span>
                                        <span className="text-gray-500 text-sm">{blog.readTime}</span>
                                    </div>
                                    
                                    <h2 className="text-xl font-semibold mb-3 hover:text-blue-600">
                                        <Link to={`/blogs/${blog.id}`}>
                                            {blog.title}
                                        </Link>
                                    </h2>
                                    
                                    <p className="text-gray-700 mb-4">{blog.excerpt}</p>
                                    
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {blog.tags.map((tag, index) => (
                                            <span 
                                                key={index}
                                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {/* Author and Date */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-xs font-medium">
                                                    {blog.author.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{blog.author}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(blog.publishDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <Link 
                                            to={`/blogs/${blog.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* No Results */}
                {filteredBlogs.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No blogs found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                )}

                {/* Pagination (Dummy) */}
                {filteredBlogs.length > 0 && (
                    <div className="flex justify-center mt-12">
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
                            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">2</button>
                            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">3</button>
                            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Next</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
