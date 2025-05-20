import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';

const ActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const isNew = !id;
  
  const API_URL = 'http://localhost:5000/api/v1';

  useEffect(() => {
    // Fetch activity data if editing
    if (id) {
      const fetchActivity = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/activities/${id}`);
          
          if (response.data.success) {
            const activityData = response.data.data;
            setActivity(activityData);
            
            // Set up images from the activity data
            if (activityData.image) {
              setImages([{
                id: Date.now(),
                url: activityData.image,
                isUploaded: true
              }]);
            }
            
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching activity:', error);
          setError('Failed to load activity data');
          setLoading(false);
        }
      };

      fetchActivity();
    }
  }, [id]);

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    duration: Yup.number().required('Duration is required').positive('Duration must be positive'),
    location: Yup.string().required('Location is required'),
    type: Yup.string().required('Activity type is required'),
  });

  // Handle image upload using server endpoint
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    
    setUploading(true);
    
    try {
      // Use server endpoint instead of direct Cloudinary API
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        
        return axios.post(`${API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      });
      
      const responses = await Promise.all(uploadPromises);
      
      const newImages = responses.map((response, index) => ({
        id: Date.now() + index,
        url: response.data.data.url,
        isUploaded: true
      }));
      
      setImages([...images, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      console.log('Error details:', error.response ? error.response.data : 'No response data');
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (images.length === 0) {
        alert('Please upload at least one image');
        setSubmitting(false);
        return;
      }
      
      // Use the first image as the main image
      const mainImage = images[0].url;
      
      // Prepare activity data
      const activityData = {
        ...values,
        image: mainImage,
        // Parse included and notIncluded from comma-separated strings to arrays
        included: values.included ? values.included.split(',').map(item => item.trim()) : [],
        notIncluded: values.notIncluded ? values.notIncluded.split(',').map(item => item.trim()) : [],
      };
      
      let response;
      
      if (isNew) {
        // Create new activity
        response = await axios.post(`${API_URL}/activities`, activityData);
      } else {
        // Update existing activity
        response = await axios.put(`${API_URL}/activities/${id}`, activityData);
      }
      
      if (response.data.success) {
        // Redirect back to activities list after save
        navigate('/admin/activities');
      } else {
        throw new Error(response.data.error || 'Failed to save activity');
      }
    } catch (error) {
      console.error('Error saving activity:', error);
      alert(error.response?.data?.error || error.message || 'Failed to save activity');
    } finally {
      setSubmitting(false);
    }
  };

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-circle text-red-500"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
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
      <div className="pb-5 border-b border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {isNew ? 'Add New Activity' : 'Edit Activity'}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/admin/activities')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg">
          <Formik
            initialValues={{
              title: activity?.title || '',
              description: activity?.description || '',
              price: activity?.price || '',
              duration: activity?.duration || '',
              location: activity?.location || '',
              type: activity?.type || '',
              included: activity?.included ? activity.included.join(', ') : '',
              notIncluded: activity?.notIncluded ? activity.notIncluded.join(', ') : '',
              featured: activity?.featured || false,
              rating: activity?.rating || 5,
              reviewCount: activity?.reviewCount || 0,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                    
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Activity Title <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="title"
                        id="title"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.title && touched.title ? 'border-red-300' : ''
                        }`}
                      />
                      <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        id="description"
                        rows={6}
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.description && touched.description ? 'border-red-300' : ''
                        }`}
                      />
                      <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price (USD) <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="number"
                          name="price"
                          id="price"
                          className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            errors.price && touched.price ? 'border-red-300' : ''
                          }`}
                        />
                        <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                      <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                          Duration (hours) <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="number"
                          name="duration"
                          id="duration"
                          className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            errors.duration && touched.duration ? 'border-red-300' : ''
                          }`}
                        />
                        <ErrorMessage name="duration" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="location"
                          id="location"
                          className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            errors.location && touched.location ? 'border-red-300' : ''
                          }`}
                        />
                        <ErrorMessage name="location" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                          Activity Type <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="type"
                          id="type"
                          className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                            errors.type && touched.type ? 'border-red-300' : ''
                          }`}
                        >
                          <option value="">Select Type</option>
                          <option value="water-sports">Water Sports</option>
                          <option value="cruises">Cruises</option>
                          <option value="island-tours">Island Tours</option>
                          <option value="diving">Diving</option>
                          <option value="adventure">Adventure</option>
                          <option value="cultural">Cultural</option>
                          <option value="wellness">Wellness</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="included" className="block text-sm font-medium text-gray-700">
                        What's Included (comma-separated)
                      </label>
                      <Field
                        as="textarea"
                        name="included"
                        id="included"
                        rows={2}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Equipment rental, Professional guide, etc."
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="notIncluded" className="block text-sm font-medium text-gray-700">
                        Not Included (comma-separated)
                      </label>
                      <Field
                        as="textarea"
                        name="notIncluded"
                        id="notIncluded"
                        rows={2}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Gratuities, Personal expenses, etc."
                      />
                    </div>
                    
                    <div className="flex items-start mt-5">
                      <div className="flex items-center h-5">
                        <Field
                          type="checkbox"
                          name="featured"
                          id="featured"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="featured" className="font-medium text-gray-700">
                          Featured Activity
                        </label>
                        <p className="text-gray-500">Display this activity prominently on the homepage</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Images Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Images</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images.map((image) => (
                      <div key={image.id} className="relative">
                        <img 
                          src={image.url} 
                          alt="Activity" 
                          className="h-32 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white hover:bg-red-700 focus:outline-none"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                    
                    {/* Upload button */}
                    <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center">
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        {uploading ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        ) : (
                          <>
                            <i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
                            <span className="mt-2 block text-sm font-medium text-gray-700">
                              Add Image
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Upload high-quality images of the activity. First image will be used as the main image.
                  </p>
                </div>
                
                {/* Submit Button */}
                <div className="border-t border-gray-200 pt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save mr-2"></i>
                        Save Activity
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </AdminLayout>
  );
};

export default ActivityForm;
