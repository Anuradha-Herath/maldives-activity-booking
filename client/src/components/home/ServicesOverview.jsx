import React from 'react';
import { Link } from 'react-router-dom';

const ServicesOverview = () => {
    const services = [
        {
            icon: '✈️',
            title: 'Travel Services',
            description: 'Travel planning and concierge services',
            link: '/travel-services',
            items: ['Travel Packages', 'Custom Itineraries', 'Concierge Support']
        },
        {
            icon: '🏡',
            title: 'Real Estate Consultation',
            description: 'Property investment guidance',
            link: '/real-estate',
            items: ['Residential Properties', 'Commercial Spaces', 'Investment Analysis']
        },
        {
            icon: '💼',
            title: 'Investment Support',
            description: 'Foreign investment assistance',
            link: '/foreign-investment',
            items: ['Business Setup', 'Legal Compliance', 'Partnership Development']
        },
        {
            icon: '🌐',
            title: 'Brand Representation',
            description: 'International brand representation',
            link: '/brand-representation',
            items: ['Product Distribution', 'Market Entry', 'Brand Promotion']
        },
        {
            icon: '📺',
            title: 'Media & Advertising',
            description: 'Marketing and promotional services',
            link: '/media-advertising',
            items: ['Digital Marketing', 'Content Creation', 'Brand Campaigns']
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Our Services
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive solutions for travel, investment, and business opportunities in the Maldives
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {service.description}
                            </p>
                            <ul className="space-y-1 mb-6">
                                {service.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="text-sm text-gray-500 flex items-center">
                                        <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link 
                                to={service.link}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline"
                            >
                                Learn More →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesOverview;
