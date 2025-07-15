import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        featuredImage: null
    });

    const [loading, setLoading] = useState(true);

    const categories = ['Travel Guide', 'Culture', 'Adventure', 'Sustainability', 'Romance', 'Food & Dining'];

    // Load existing blog data
    useEffect(() => {
        // Dummy data - in real app, this would fetch from API
        const existingBlog = {
            1: {
                title: "Top 10 Must-Visit Islands in the Maldives",
                excerpt: "Discover the most breathtaking islands that offer unique experiences, from luxury resorts to local cultural immersion.",
                content: `<p>The Maldives, with its pristine beaches, crystal-clear waters, and vibrant marine life, is home to over 1,000 coral islands...</p>

<h2>1. Malé - The Bustling Capital</h2>
<p>Malé, the capital city, is where most visitors first set foot in the Maldives...</p>`,
                category: "Travel Guide",
                tags: "Islands, Travel, Tourism"
            }
        };

        const blog = existingBlog[id];
        if (blog) {
            setFormData(blog);
        }
        setLoading(false);
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            featuredImage: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.title || !formData.content || !formData.category) {
            alert('Please fill in all required fields.');
            return;
        }

        // Here you would normally submit to backend
        console.log('Updated blog data:', formData);
        alert('Blog post updated successfully!');
        navigate(`/blogs/${id}`);
    };

    const handlePreview = () => {
        // Open preview in new window or modal
        alert('Preview functionality would open here');
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            // Handle delete logic here
            alert('Blog post deleted successfully!');
            navigate('/blogs');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading blog post...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <nav className="text-sm">
                        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/blogs" className="text-blue-600 hover:underline">Blogs</Link>
                        <span className="mx-2">/</span>
                        <Link to={`/blogs/${id}`} className="text-blue-600 hover:underline">Blog Post</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-500">Edit</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                            🗑️ Delete Post
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter an engaging title for your blog post..."
                                className="w-full border border-gray-300 rounded-md p-3 text-lg"
                                required
                            />
                        </div>

                        {/* Category and Tags */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-3"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        placeholder="e.g. travel, maldives, tourism"
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt
                            </label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Write a brief summary of your blog post (appears in blog listings)..."
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {formData.excerpt.length}/200 characters (recommended)
                            </p>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Featured Image
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Current image:</p>
                                    <div className="w-32 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded flex items-center justify-center text-white text-xs">
                                        Current Image
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="w-full"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Upload a new image to replace the current one (recommended: 1200x600px)
                                </p>
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Content *
                            </label>
                            <div className="mb-4">
                                <div className="flex gap-2 p-2 border border-gray-200 rounded-t-md bg-gray-50">
                                    <button type="button" className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                                        <strong>B</strong>
                                    </button>
                                    <button type="button" className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                                        <em>I</em>
                                    </button>
                                    <button type="button" className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                                        H1
                                    </button>
                                    <button type="button" className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                                        H2
                                    </button>
                                    <button type="button" className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                                        📝 List
                                    </button>
                                    <button type="button" className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                                        🔗 Link
                                    </button>
                                </div>
                            </div>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                rows="20"
                                placeholder="Write your blog content here... You can use HTML tags for formatting."
                                className="w-full border border-gray-300 rounded-b-md p-3 font-mono text-sm"
                                required
                            />
                            <div className="mt-2 text-sm text-gray-500">
                                <p>Formatting tips:</p>
                                <ul className="list-disc list-inside">
                                    <li>Use &lt;h2&gt; for section headers</li>
                                    <li>Use &lt;p&gt; for paragraphs</li>
                                    <li>Use &lt;strong&gt; for bold text</li>
                                    <li>Use &lt;em&gt; for italic text</li>
                                </ul>
                            </div>
                        </div>

                        {/* Publishing Options */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4">Publishing Options</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input type="checkbox" id="featured" className="mr-2" />
                                    <label htmlFor="featured" className="text-sm">Mark as featured post</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="comments" className="mr-2" defaultChecked />
                                    <label htmlFor="comments" className="text-sm">Allow comments</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="newsletter" className="mr-2" />
                                    <label htmlFor="newsletter" className="text-sm">Include in newsletter</label>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-6">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handlePreview}
                                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    👁️ Preview
                                </button>
                                <button
                                    type="button"
                                    className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                                >
                                    💾 Save Draft
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    to={`/blogs/${id}`}
                                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    💾 Update Blog
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
