
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../../utils/api'; // Assumes a new API utility for all services

const PopularServices = () => {
    const carouselRef = useRef(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularServices = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('🔍 PopularServices: Starting to fetch services...');
                console.log('🌐 API Base URL:', servicesAPI.baseUrl || 'Using default API configuration');

                const response = await servicesAPI.getAll();
                console.log('📡 PopularServices: API Response received:', response);

                const servicesData = response?.data?.data || [];
                console.log('📊 PopularServices: Services data:', servicesData);
                console.log('📈 PopularServices: Total services count:', servicesData.length);

                // Filter for active services and sort by rating
                const popularServices = servicesData
                    .filter(service => service?.status === 'active')
                    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                    .slice(0, 6);

                console.log('⭐ PopularServices: Popular services (filtered & sorted):', popularServices);

                setServices(popularServices);
                setLoading(false);
            } catch (err) {
                console.error('❌ PopularServices: Error fetching services:', err);
                console.error('❌ PopularServices: Error details:', {
                    message: err.message,
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    data: err.response?.data,
                    config: err.config
                });

                setError(`Failed to load services: ${err.message}`);
                setLoading(false);
            }
        };

        fetchPopularServices();
    }, []);

    const handleBookNow = (id, type) => {
        const route = type === 'activity' ? `/activities/${id}` :
                     type === 'travel-package' ? `/travel-packages/${id}` :
                     type === 'accommodation' ? `/accommodation/${id}` :
                     type === 'real-estate' ? `/real-estate/${id}` :
                     type === 'investment' ? `/investment/${id}` :
                     `/brand-representation/${id}`;
        window.location.href = route;
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const LoadingSkeleton = () => (
        <div className="flex space-x-6 pb-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-blue-700 font-display mb-2">Most Popular Services</h2>
                        <p className="text-gray-600 text-lg">Explore our top-rated experiences and services in the Maldives</p>
                    </div>
                    <Link 
                        to="/services" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        <span>View All</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>

                {loading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-8 rounded-xl text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-semibold mb-3">Unable to Load Services</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <div className="space-y-2 text-sm text-red-500 mb-6">
                            <p>Please check:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Your internet connection</li>
                                <li>Browser console for detailed errors</li>
                                <li>Try refreshing the page</li>
                            </ul>
                        </div>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="relative">
                        <button 
                            onClick={scrollLeft} 
                            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-20 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-blue-700 hover:bg-blue-50 hover:text-blue-800 focus:outline-none transition-all duration-300 hover:scale-110"
                            aria-label="Scroll left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div 
                            ref={carouselRef} 
                            className="flex overflow-x-auto pb-6 space-x-6 hide-scrollbar scroll-smooth"
                        >
                            {services.map((service, index) => (
                                <div 
                                    key={service._id} 
                                    className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col group transform hover:scale-105"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img 
                                            src={service.image.includes('?') ? service.image : `${service.image}?v=1.0.0`} 
                                            alt={service.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                                            ${service.price}
                                        </div>
                                        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                            {service.type.charAt(0).toUpperCase() + service.type.slice(1)}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors leading-tight">{service.title}</h3>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="text-sm ml-2 text-gray-600 font-semibold">{service.rating}</span>
                                                <span className="ml-1 text-xs text-gray-500">({service.reviewCount || Math.floor(Math.random() * 100) + 50})</span>
                                            </div>
                                        </div>
                                        <div className="h-20 overflow-hidden mb-6">
                                            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                                {service.shortDescription || service.description}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => handleBookNow(service._id, service.type)}
                                            className="mt-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                        >
                                            {service.type === 'activity' ? 'Book Experience' : 
                                             service.type === 'travel-package' ? 'Book Package' : 
                                             service.type === 'accommodation' ? 'Book Stay' : 
                                             'Explore Now'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={scrollRight} 
                            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-20 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-blue-700 hover:bg-blue-50 hover:text-blue-800 focus:outline-none transition-all duration-300 hover:scale-110"
                            aria-label="Scroll right"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PopularServices;
