import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';

const AdminActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = 'http://localhost:5000/api/v1';

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/activities/${id}`);
        
        if (response.data.success) {
          setActivity(response.data.data);
        } else {
          throw new Error('Failed to fetch activity');
        }
      } catch (error) {
        console.error('Error fetching activity:', error);
        setError('Failed to load activity details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivity();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        setLoading(true);
        const response = await axios.delete(`${API_URL}/activities/${id}`);
        
        if (response.data.success) {
          navigate('/admin/activities');
        } else {
          throw new Error('Failed to delete activity');
        }
      } catch (error) {
        console.error('Error deleting activity:', error);
        alert('Failed to delete activity: ' + (error.response?.data?.error || error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !activity) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-circle text-red-500"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error || "Activity not found"}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => navigate('/admin/activities')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Back to Activities
        </button>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Activity Details</h1>
        <div className="mt-3 flex space-x-3 sm:mt-0">
          <Link
            to="/admin/activities"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back
          </Link>
          <Link
            to={`/admin/activities/${id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            <i className="fas fa-edit mr-2"></i> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
          >
            <i className="fas fa-trash mr-2"></i> Delete
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* Activity Main Info */}
        <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {activity.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Created on {new Date(activity.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-2">
            {activity.featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Featured
              </span>
            )}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              activity.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {activity.status ? activity.status.charAt(0).toUpperCase() + activity.status.slice(1) : 'Active'}
            </span>
          </div>
        </div>
        
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Left Column - Images and Details */}
            <div>
              {/* Main Image */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Main Image</h4>
                <div className="h-64 rounded-lg overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                    }}
                  />
                </div>
              </div>
              
              {/* Gallery Images */}
              {activity.galleryImages && activity.galleryImages.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Gallery Images</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activity.galleryImages.map((image, index) => (
                      <div key={index} className="h-24 rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Basic Details */}
              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Price</dt>
                  <dd className="mt-1 text-sm text-gray-900">${activity.price}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1 text-sm text-gray-900">{activity.duration} hours</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{activity.location}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {activity.type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Max Participants</dt>
                  <dd className="mt-1 text-sm text-gray-900">{activity.maxParticipants || 'Not specified'}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Rating</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {activity.rating} ({activity.reviewCount} reviews)
                  </dd>
                </div>
              </dl>
            </div>
            
            {/* Right Column - Description and Lists */}
            <div>
              {/* Description */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{activity.description}</p>
                </div>
              </div>
              
              {/* Short Description */}
              {activity.shortDescription && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Short Description</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{activity.shortDescription}</p>
                  </div>
                </div>
              )}
              
              {/* Included */}
              {activity.included && activity.included.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">What's Included</h4>
                  <ul className="bg-gray-50 rounded-lg p-4">
                    {activity.included.map((item, index) => (
                      <li key={index} className="flex items-start mb-2 last:mb-0">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Not Included */}
              {activity.notIncluded && activity.notIncluded.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Not Included</h4>
                  <ul className="bg-gray-50 rounded-lg p-4">
                    {activity.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start mb-2 last:mb-0">
                        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Requirements */}
              {activity.requirements && activity.requirements.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Requirements</h4>
                  <ul className="bg-gray-50 rounded-lg p-4">
                    {activity.requirements.map((item, index) => (
                      <li key={index} className="flex items-start mb-2 last:mb-0">
                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Preview Link */}
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">ID: {activity._id}</span>
            <Link
              to={`/activities/${activity._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View on website <i className="fas fa-external-link-alt ml-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminActivityDetail;
