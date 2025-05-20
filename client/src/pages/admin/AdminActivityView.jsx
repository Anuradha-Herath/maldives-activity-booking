import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';

const AdminActivityView = () => {
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
          throw new Error('Failed to fetch activity details');
        }
      } catch (error) {
        console.error('Error fetching activity:', error);
        setError('Failed to load activity details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivity();
    }
  }, [id]);

  // Delete activity handler
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
              <p className="text-sm text-red-700">{error || 'Activity not found'}</p>
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
        <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-3">
          <Link
            to={`/admin/activities/${id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            <i className="fas fa-edit mr-2"></i> Edit Activity
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
          >
            <i className="fas fa-trash mr-2"></i> Delete
          </button>
          <Link
            to="/admin/activities"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{activity.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Activity ID: {activity._id}</p>
          </div>
          <div>
            {activity.featured && (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Featured
              </span>
            )}
            <span className={`ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
              activity.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {activity.status ? activity.status.charAt(0).toUpperCase() + activity.status.slice(1) : 'Active'}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="md:col-span-1">
              <img 
                src={activity.image} 
                alt={activity.title} 
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              
              {activity.galleryImages && activity.galleryImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Gallery Images:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {activity.galleryImages.map((img, index) => (
                      <img 
                        key={index}
                        src={img} 
                        alt={`Gallery ${index + 1}`} 
                        className="w-full h-20 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100?text=NA';
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Price</dt>
                  <dd className="mt-1 text-lg text-gray-900">${activity.price}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1 text-gray-900">{activity.duration} hour{activity.duration !== 1 ? 's' : ''}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-gray-900">{activity.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-gray-900">{activity.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Max Participants</dt>
                  <dd className="mt-1 text-gray-900">{activity.maxParticipants || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Rating</dt>
                  <dd className="mt-1 text-gray-900 flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    {activity.rating} ({activity.reviewCount} reviews)
                  </dd>
                </div>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-gray-900 whitespace-pre-line">{activity.description}</dd>
                </div>
                
                {activity.shortDescription && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Short Description</dt>
                    <dd className="mt-1 text-gray-900">{activity.shortDescription}</dd>
                  </div>
                )}
                
                {activity.included && activity.included.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 mb-2">What's Included</dt>
                    <dd className="mt-1">
                      <ul className="list-disc pl-5 space-y-1">
                        {activity.included.map((item, index) => (
                          <li key={index} className="text-gray-900">{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                
                {activity.notIncluded && activity.notIncluded.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 mb-2">Not Included</dt>
                    <dd className="mt-1">
                      <ul className="list-disc pl-5 space-y-1">
                        {activity.notIncluded.map((item, index) => (
                          <li key={index} className="text-gray-900">{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                
                {activity.requirements && activity.requirements.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 mb-2">Requirements</dt>
                    <dd className="mt-1">
                      <ul className="list-disc pl-5 space-y-1">
                        {activity.requirements.map((item, index) => (
                          <li key={index} className="text-gray-900">{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="mt-1 text-gray-900">
                    {new Date(activity.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Link 
          to={`/activities/${activity._id}`} 
          target="_blank" 
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <i className="fas fa-external-link-alt mr-2"></i>
          View on Public Site
        </Link>
      </div>
    </AdminLayout>
  );
};

export default AdminActivityView;
