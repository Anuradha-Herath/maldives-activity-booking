
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../utils/api';
import ServiceCard from '../components/common/ServiceCard';

const TravelPackages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await servicesAPI.getAll();
        const packagesData = response?.data?.data?.filter(service => service.type === 'travel-package') || [];
        const activePackages = packagesData.filter(pkg => pkg.status === 'active');
        setPackages(activePackages);
        setFilteredPackages(activePackages);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load travel packages: ${err.message}`);
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    let filtered = packages;
    if (selectedDestination !== 'all') {
      filtered = packages.filter(pkg => pkg.destination === selectedDestination);
    }
    if (searchQuery) {
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }
    setFilteredPackages(filtered);
  }, [searchQuery, selectedDestination, sortBy, packages]);

  const destinations = [
    { value: 'all', label: 'All Destinations' },
    { value: 'male', label: 'Malé' },
    { value: 'south-ari-atoll', label: 'South Ari Atoll' },
    { value: 'baja-atoll', label: 'Baja Atoll' },
    { value: 'north-male-atoll', label: 'North Malé Atoll' },
  ];

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
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
          <h2 className="text-4xl font-bold text-blue-700 font-display mb-3">Travel Packages</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore IsleKey Tourism’s curated travel packages for an unforgettable Maldives adventure
          </p>
        </div>

        <div className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search travel packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>
          <div className="w-full sm:w-1/4">
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              {destinations.map(dest => (
                <option key={dest.value} value={dest.value}>{dest.label}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-1/4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
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
            <h3 className="text-xl font-semibold mb-3">Unable to Load Travel Packages</h3>
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
            {filteredPackages.length > 0 ? (
              filteredPackages.map(pkg => (
                <ServiceCard key={pkg._id} service={pkg} />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No travel packages found matching your criteria.</p>
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

export default TravelPackages;
