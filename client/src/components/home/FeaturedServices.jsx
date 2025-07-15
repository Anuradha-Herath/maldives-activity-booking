
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedServices = () => {
    const services = [
        {
            id: 1,
            type: 'activity',
            title: 'Scuba Diving Adventure',
            description: 'Explore vibrant coral reefs and marine life in the Maldives.',
            price: 149,
        },
        {
            id: 2,
            type: 'travel-package',
            title: 'Luxury Island Getaway',
            description: 'A curated package with resort stays and exclusive tours.',
            price: 499,
        },
        {
            id: 3,
            type: 'accommodation',
            title: 'Overwater Villa Stay',
            description: 'Relax in a luxury overwater villa with stunning views.',
            price: 299,
        },
    ];

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary font-display">Featured Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(service => (
                        <div
                            key={service.id}
                            className="activity-card shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full bg-white rounded-xl border border-blue-50"
                        >
                            <div className="p-6 flex flex-col h-full">
                                <h3 className="text-xl font-bold mb-2 text-secondary">{service.title}</h3>
                                <p className="mb-4 text-text flex-grow">{service.description}</p>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-xl font-bold text-secondary">${service.price}</span>
                                    <Link
                                        to={`/${service.type}/${service.id}`}
                                        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors font-semibold"
                                    >
                                        {service.type === 'activity' ? 'Book Experience' : 
                                         service.type === 'travel-package' ? 'Book Package' : 
                                         service.type === 'accommodation' ? 'Book Stay' : 'Explore Now'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedServices;
