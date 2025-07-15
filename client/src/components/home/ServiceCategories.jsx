
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCategories = () => {
    const categories = [
        { slug: 'activities', title: 'Activities', icon: '🏄‍♂️', description: 'Experience water sports, diving, and cultural adventures' },
        { slug: 'travel-packages', title: 'Travel Packages', icon: '🧳', description: 'Curated trips combining activities and stays' },
        { slug: 'accommodation', title: 'Accommodation', icon: '🏨', description: 'Luxury resorts and cozy guesthouses' },
        { slug: 'real-estate', title: 'Real Estate', icon: '🏡', description: 'Find your dream property in the Maldives' },
        { slug: 'investment', title: 'Investment Support', icon: '📈', description: 'Expert guidance for business investments' },
        { slug: 'brand-representation', title: 'Brand Representation', icon: '🌍', description: 'Global promotion for your brand' },
        { slug: 'travel-services', title: 'Travel Services', icon: '✈️', description: 'Flights, transfers, and visa assistance' },
    ];

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-700 font-display mb-3">Service Categories</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Explore IsleKey Tourism’s range of services for your perfect Maldives experience</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map(category => (
                    <Link
                        to={`/${category.slug}`}
                        key={category.slug}
                        className="relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 border border-blue-50 group"
                    >
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 text-center group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
                            <span className="text-5xl">{category.icon}</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-blue-600 group-hover:text-blue-700">{category.title}</h3>
                        </div>
                        {/* Hover overlay with description */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white p-4 text-center">{category.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div className="text-center mt-10">
                <Link 
                    to="/services" 
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
                >
                    View All Services
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default ServiceCategories;
