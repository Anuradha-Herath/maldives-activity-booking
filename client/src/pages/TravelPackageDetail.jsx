
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesAPI } from '../utils/api';

const TravelPackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await servicesAPI.getById(id);
        const packageData = response?.data?.data;
        if (packageData?.type === 'travel-package' && packageData?.status === 'active') {
          setPkg(packageData);
        } else {
          setError('Travel package not found');
        }
        setLoading(false);
      } catch (err) {
        setError(`Failed to load travel package: ${err.message}`);
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (error || !pkg) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-600 p-8 rounded-xl text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-3">Unable to Load Travel Package</h3>
            <p className="text-red-600 mb-4">{error || 'Package not found'}</p>
            <Link
              to="/travel-packages"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
            >
              Back to Travel Packages
              <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-700 font-display mb-4">{pkg.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl">{pkg.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={pkg.image.includes('?') ? pkg.image : `${pkg.image}?v=1.0.0`}
              alt={pkg.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg mb-8"
              loading="lazy"
            />
            <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-50">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Itinerary</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {pkg.itinerary?.map((item, index) => (
                  <li key={index}>{item}</li>
                )) || <p>No itinerary details available.</p>}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-50 mt-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Inclusions</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {pkg.inclusions?.map((item, index) => (
                  <li key={index}>{item}</li>
                )) || <p>No inclusions listed.</p>}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-50 sticky top-4">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Package Details</h2>
              <p className="text-gray-600 mb-4"><strong>Price:</strong> ${pkg.price} USD</p>
              <p className="text-gray-600 mb-4"><strong>Duration:</strong> {pkg.duration || 'Not specified'}</p>
              <p className="text-gray-600 mb-4"><strong>Destination:</strong> {pkg.destination || 'Not specified'}</p>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(pkg.rating || 4.8) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm ml-2 text-gray-600">{pkg.rating || 4.8} ({pkg.reviewCount || 50} reviews)</span>
                </div>
              </div>
              <Link
                to={`/booking/${pkg._id}`}
                className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold text-center transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Book Package
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-blue-50">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Customer Reviews</h2>
          {pkg.reviews?.length > 0 ? (
            <div className="space-y-6">
              {pkg.reviews.slice(0, 3).map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{review.author}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/travel-packages"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
          >
            Explore More Packages
            <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelPackageDetail;
