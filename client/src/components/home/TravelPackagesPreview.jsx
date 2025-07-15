import React from 'react';
import { Link } from 'react-router-dom';

const TravelPackagesPreview = () => {
    const featuredPackages = [
        {
            id: 1,
            title: "Romantic Getaway Package",
            duration: "5 Days 4 Nights",
            price: 2500,
            image: "/images/romantic-package.jpg",
            description: "Perfect honeymoon package with luxury accommodation and romantic experiences",
            highlights: ["Private Beach Dinner", "Spa Treatment", "Sunset Cruise"]
        },
        {
            id: 2,
            title: "Adventure Explorer Package",
            duration: "7 Days 6 Nights",
            price: 3200,
            image: "/images/adventure-package.jpg",
            description: "Thrilling activities and island exploration for adventure seekers",
            highlights: ["Scuba Diving", "Island Hopping", "Water Sports"]
        },
        {
            id: 3,
            title: "Family Fun Package",
            duration: "6 Days 5 Nights",
            price: 2800,
            image: "/images/family-package.jpg",
            description: "Family-friendly activities and accommodations for all ages",
            highlights: ["Family Resort", "Kid Activities", "Snorkeling"]
        }
    ];

    return (
        <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Featured Travel Packages
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our curated travel packages designed to give you the perfect Maldivian experience
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featuredPackages.map(pkg => (
                        <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Package Image */}
                            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                                <span className="text-lg">📸 Package Image</span>
                            </div>
                            
                            {/* Package Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{pkg.title}</h3>
                                <p className="text-gray-600 mb-3">{pkg.description}</p>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-gray-500">{pkg.duration}</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        ${pkg.price}
                                        <span className="text-sm text-gray-500"> per person</span>
                                    </span>
                                </div>
                                
                                {/* Highlights */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Package Highlights:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {pkg.highlights.map((highlight, index) => (
                                            <span 
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <Link 
                                    to={`/travel-packages/${pkg.id}`}
                                    className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                                >
                                    View Package Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <Link 
                        to="/travel-packages"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        View All Travel Packages
                    </Link>
                    <p className="text-gray-600 mt-4">
                        Can't find what you're looking for? 
                        <Link to="/contact" className="text-blue-600 hover:underline ml-1">
                            Contact us for custom packages
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TravelPackagesPreview;
