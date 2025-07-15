
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../utils/api';
import ServiceCard from '../components/common/ServiceCard';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await servicesAPI.getAll();
        const servicesData = response?.data?.data || [];
        const activeServices = servicesData.filter(service => service?.status === 'active');
        setServices(activeServices);
        setFilteredServices(activeServices);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load services: ${err.message}`);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = services;
    if (selectedType !== 'all') {
      filtered = services.filter(service => service.type === selectedType);
    }
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredServices(filtered);
  }, [searchQuery, selectedType, services]);

  const serviceTypes = [
    { value: 'all', label: 'All Services' },
    { value: 'activity', label: 'Activities' },
    { value: 'travel-package', label: 'Travel Packages' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'investment', label: 'Investment Support' },
    { value: 'brand-representation', label: 'Brand Representation' },
    { value: 'travel-services', label: 'Travel Services' },
  ];

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6 space-y-3">
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 font-display mb-3">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover IsleKey Tourism’s range of experiences and services in the Maldives
          </p>
        </div>

        <div className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>
          <div className="w-full sm:w-1/4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              {serviceTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
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
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <ServiceCard key={service._id} service={service} />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No services found matching your criteria.</p>
            )}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
          >
            Need Help? Contact Us
            <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
