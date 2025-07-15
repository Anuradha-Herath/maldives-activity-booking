
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const getRoute = (type, id) => {
        switch (type) {
            case 'activity':
                return `/activities/${id}`;
            case 'travel-package':
                return `/travel-packages/${id}`;
            case 'accommodation':
                return `/accommodation/${id}`;
            case 'real-estate':
                return `/real-estate/${id}`;
            case 'investment':
                return `/investment/${id}`;
            case 'brand-representation':
                return `/brand-representation/${id}`;
            case 'travel-services':
                return `/travel-services/${id}`;
            default:
                return '/services';
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full flex flex-col transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group border border-blue-50">
            <div className="relative overflow-hidden">
                <img 
                    src={service.image.includes('?') ? service.image : `${service.image}?v=1.0.0`} 
                    alt={service.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ${service.price} USD
                </div>
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {service.type.charAt(0).toUpperCase() + service.type.slice(1).replace(/-/g, ' ')}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-blue-700 mb-3 group-hover:text-blue-800 transition-colors">{service.title}</h2>
                <p className="text-gray-600 flex-grow leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(service.rating || 4.8) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            ))}
                            <span className="text-sm text-gray-600 ml-1">{service.rating || 4.8}</span>
                        </div>
                    </div>
                    <Link
                        to={getRoute(service.type, service.id)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        {service.type === 'activity' ? 'Book Experience' :
                         service.type === 'travel-package' ? 'Book Package' :
                         service.type === 'accommodation' ? 'Book Stay' :
                         'Explore Now'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
