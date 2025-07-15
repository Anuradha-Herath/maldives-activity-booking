import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        featuredImage: null
    });

    const categories = ['Travel Guide', 'Culture', 'Adventure', 'Sustainability', 'Romance', 'Food & Dining'];

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
        console.log('Blog data:', formData);
        alert('Blog post created successfully!');
        navigate('/blogs');
    };

    const handlePreview = () => {
        // Open preview in new window or modal
        alert('Preview functionality would open here');
    };

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
                        <span className="text-gray-500">Create New Blog</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>

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
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="w-full"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Upload a high-quality image (recommended: 1200x600px)
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

                        {/* SEO Settings */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Title (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Leave blank to use blog title"
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Description (Optional)
                                    </label>
                                    <textarea
                                        rows="2"
                                        placeholder="Leave blank to use excerpt"
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
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
                                    to="/blogs"
                                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    📄 Publish Blog
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
