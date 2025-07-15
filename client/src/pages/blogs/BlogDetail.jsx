import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Dummy blog data
    const blogData = {
        1: {
            title: "Top 10 Must-Visit Islands in the Maldives",
            content: `
                <p>The Maldives, with its pristine beaches, crystal-clear waters, and vibrant marine life, is home to over 1,000 coral islands. Choosing which islands to visit can be overwhelming, so we've compiled a list of the top 10 must-visit islands that offer unique experiences and unforgettable memories.</p>

                <h2>1. Malé - The Bustling Capital</h2>
                <p>Malé, the capital city, is where most visitors first set foot in the Maldives. Despite its small size, Malé is packed with cultural attractions, local markets, and historical sites. Don't miss the Friday Mosque, the National Museum, and the vibrant local fish market.</p>

                <h2>2. Maafushi - Local Island Experience</h2>
                <p>Maafushi offers an authentic Maldivian experience with guesthouses, local restaurants, and cultural interactions. It's perfect for budget travelers who want to experience local life while enjoying beautiful beaches and water activities.</p>

                <h2>3. Hulhumalé - The Artificial Paradise</h2>
                <p>This artificial island near the airport offers modern amenities and beautiful beaches. It's an excellent choice for those who want convenience and comfort while still experiencing the beauty of the Maldives.</p>

                <h2>4. Fulidhoo - Untouched Beauty</h2>
                <p>Located in Vaavu Atoll, Fulidhoo is known for its pristine environment and excellent snorkeling spots. The island maintains its traditional charm while offering basic tourist facilities.</p>

                <h2>5. Dhigurah - The Long Island</h2>
                <p>Famous for its incredibly long beach and whale shark sightings, Dhigurah in South Ari Atoll is a paradise for marine life enthusiasts and beach lovers.</p>

                <h2>Conclusion</h2>
                <p>Each island in the Maldives offers something unique, from luxury resorts to authentic local experiences. The key is to choose islands that match your travel style and budget while ensuring you get to experience the natural beauty that makes the Maldives so special.</p>
            `,
            author: "Sarah Johnson",
            publishDate: "2024-01-15",
            category: "Travel Guide",
            readTime: "8 min read",
            image: "/images/blog-islands.jpg",
            tags: ["Islands", "Travel", "Tourism"]
        }
    };

    const blog = blogData[id] || blogData[1]; // Fallback

    const relatedBlogs = [
        { id: 2, title: "Maldivian Cuisine: A Culinary Journey", category: "Culture" },
        { id: 3, title: "Best Water Sports Activities in the Maldives", category: "Adventure" },
        { id: 5, title: "Planning Your Perfect Maldives Honeymoon", category: "Romance" }
    ];

    // Check if current user is the author (dummy check)
    const isAuthor = true; // This would come from authentication context

    const handleEdit = () => {
        navigate(`/blogs/${id}/edit`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            // Handle delete logic here
            alert('Blog post deleted successfully!');
            navigate('/blogs');
        }
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
                        <span className="text-gray-500">{blog.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <article className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Blog Header */}
                            <div className="h-64 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                                <span className="text-2xl">📸 Featured Image</span>
                            </div>
                            
                            <div className="p-8">
                                {/* Blog Meta */}
                                <div className="flex items-center mb-6">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-4">
                                        {blog.category}
                                    </span>
                                    <span className="text-gray-500 text-sm mr-4">{blog.readTime}</span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(blog.publishDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                {/* Blog Title */}
                                <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

                                {/* Author Info */}
                                <div className="flex items-center mb-8 pb-6 border-b">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-sm font-medium">
                                            {blog.author.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">{blog.author}</p>
                                        <p className="text-sm text-gray-500">Travel Writer & Local Expert</p>
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div 
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />

                                {/* Tags */}
                                <div className="mt-8 pt-6 border-t">
                                    <h4 className="font-medium mb-3">Tags:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map((tag, index) => (
                                            <span 
                                                key={index}
                                                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Author Actions */}
                                {isAuthor && (
                                    <div className="mt-8 pt-6 border-t">
                                        <h4 className="font-medium mb-3">Manage Post:</h4>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleEdit}
                                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                            >
                                                ✏️ Edit Post
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                                            >
                                                🗑️ Delete Post
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Share Section */}
                                <div className="mt-8 pt-6 border-t">
                                    <h4 className="font-medium mb-3">Share this article:</h4>
                                    <div className="flex gap-3">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                            📘 Facebook
                                        </button>
                                        <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
                                            🐦 Twitter
                                        </button>
                                        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors">
                                            💼 LinkedIn
                                        </button>
                                        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                                            📧 Email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Related Articles */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                            <div className="space-y-4">
                                {relatedBlogs.map(relatedBlog => (
                                    <Link 
                                        key={relatedBlog.id}
                                        to={`/blogs/${relatedBlog.id}`}
                                        className="block hover:text-blue-600"
                                    >
                                        <div className="border-l-4 border-blue-500 pl-3">
                                            <h4 className="font-medium text-sm mb-1">{relatedBlog.title}</h4>
                                            <span className="text-xs text-gray-500">{relatedBlog.category}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-blue-50 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Subscribe to our newsletter for the latest travel tips and destination guides.
                            </p>
                            <form className="space-y-3">
                                <input 
                                    type="email" 
                                    placeholder="Your email address"
                                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                />
                                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                                    Subscribe
                                </button>
                            </form>
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <div className="space-y-2">
                                {['Travel Guide', 'Culture', 'Adventure', 'Sustainability', 'Romance'].map(category => (
                                    <Link 
                                        key={category}
                                        to={`/blogs?category=${category}`}
                                        className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 p-2 rounded"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
