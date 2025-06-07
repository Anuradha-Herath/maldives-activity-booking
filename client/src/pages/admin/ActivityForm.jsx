import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';

const ActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [images, setImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const isNew = !id;
  
  const API_URL = 'https://maldives-activity-booking-backend.onrender.com/api/v1';

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
            
            // Set up main image
            if (activityData.image) {
              setImages([{
                id: Date.now(),
                url: activityData.image,
                isUploaded: true
              }]);
            }
            
            // Set up gallery images if any
            if (activityData.galleryImages && activityData.galleryImages.length > 0) {
              setGalleryImages(activityData.galleryImages.map((url, index) => ({
                id: Date.now() + index + 1,
                url,
                isUploaded: true
              })));
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
    shortDescription: Yup.string().max(200, 'Short description cannot exceed 200 characters'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    duration: Yup.number().required('Duration is required').positive('Duration must be positive'),
    location: Yup.string().required('Location is required'),
    type: Yup.string().required('Activity type is required'),
    maxParticipants: Yup.number().positive('Must be positive').integer('Must be a whole number'),
  });

  // Handle image upload for main image
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    
    setUploading(true);
    
    try {
      // Take just the first file for the main image
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('Uploading main image:', file.name);
      
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Upload response:', response.data);
      
      if (response.data.success) {
        const newImage = {
          id: Date.now(),
          url: response.data.data.url,
          isUploaded: true
        };
        
        setImages([...images, newImage]);
      } else {
        throw new Error(response.data.error || 'Upload failed with unknown error');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      console.log('Error details:', error.response ? error.response.data : 'No response data');
      alert(`Failed to upload image: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };
  
  // Handle gallery image upload - simplified to upload one at a time
  const handleGalleryImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    
    setUploading(true);
    
    try {
      // Process files one at a time
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        
        console.log('Uploading gallery image:', file.name);
        
        const response = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (response.data.success) {
          const newImage = {
            id: Date.now() + Math.random(),
            url: response.data.data.url,
            isUploaded: true
          };
          
          setGalleryImages(prev => [...prev, newImage]);
        } else {
          console.error('Upload failed:', response.data.error);
        }
      }
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      alert(`Failed to upload gallery images: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  // Remove main image
  const removeImage = (imageId) => {
    setImages(images.filter(image => image.id !== imageId));
  };

  // Remove gallery image
  const removeGalleryImage = (imageId) => {
    setGalleryImages(galleryImages.filter(image => image.id !== imageId));
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (images.length === 0) {
        alert('Please upload at least one main image');
        setSubmitting(false);
        return;
      }
      
      // Use the first image as the main image
      const mainImage = images[0].url;
      
      // Get all gallery image URLs
      const galleryImageUrls = galleryImages.map(img => img.url);
      
      // Prepare activity data
      const activityData = {
        ...values,
        image: mainImage,
        galleryImages: galleryImageUrls,
        // Parse arrays from form inputs if they're not already arrays
        included: Array.isArray(values.included) ? values.included : 
                  values.included ? values.included.split(',').map(item => item.trim()) : [],
        notIncluded: Array.isArray(values.notIncluded) ? values.notIncluded : 
                    values.notIncluded ? values.notIncluded.split(',').map(item => item.trim()) : [],
        requirements: Array.isArray(values.requirements) ? values.requirements : 
                      values.requirements ? values.requirements.split(',').map(item => item.trim()) : [],
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
              shortDescription: activity?.shortDescription || '',
              price: activity?.price || '',
              duration: activity?.duration || '',
              location: activity?.location || '',
              type: activity?.type || '',
              maxParticipants: activity?.maxParticipants || 10,
              // Rating will still be included in the data but not editable
              rating: activity?.rating || 5,
              reviewCount: activity?.reviewCount || 0,
              included: activity?.included || [],
              notIncluded: activity?.notIncluded || [],
              requirements: activity?.requirements || [],
              featured: activity?.featured || false,
              status: activity?.status || 'active',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, values, setFieldValue }) => (
              <Form className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                    
                    <div>
                      <label htmlFor="title" className="block text-base font-medium text-gray-700">
                        Activity Title <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="title"
                        id="title"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md 
                          text-base py-3 px-4 ${
                          errors.title && touched.title ? 'border-red-300' : ''
                        }`}
                      />
                      <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div>
                      <label htmlFor="shortDescription" className="block text-base font-medium text-gray-700">
                        Short Description (for listings)
                      </label>
                      <Field
                        as="textarea"
                        name="shortDescription"
                        id="shortDescription"
                        rows={2}
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md 
                          text-base py-3 px-4 ${
                          errors.shortDescription && touched.shortDescription ? 'border-red-300' : ''
                        }`}
                        placeholder="Brief description for activity listings (max 200 chars)"
                      />
                      <ErrorMessage name="shortDescription" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-base font-medium text-gray-700">
                        Full Description <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        id="description"
                        rows={6}
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md 
                          text-base py-3 px-4 ${
                          errors.description && touched.description ? 'border-red-300' : ''
                        }`}
                      />
                      <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price" className="block text-base font-medium text-gray-700">
                          Price (USD) <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="number"
                          name="price"
                          id="price"
                          className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md 
                            text-base py-3 px-4 ${
                            errors.price && touched.price ? 'border-red-300' : ''
                          }`}
                        />
                        <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                      <div>
                        <label htmlFor="duration" className="block text-base font-medium text-gray-700">
                          Duration (hours) <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="number"
                          name="duration"
                          id="duration"
                          className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md 
                            text-base py-3 px-4 ${
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
                        <label htmlFor="location" className="block text-base font-medium text-gray-700">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="location"
                          id="location"
                          className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md 
                            text-base py-3 px-4 ${
                            errors.location && touched.location ? 'border-red-300' : ''
                          }`}
                        />
                        <ErrorMessage name="location" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                      <div>
                        <label htmlFor="type" className="block text-base font-medium text-gray-700">
                          Activity Type <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="type"
                          id="type"
                          className={`mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm 
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base ${
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
                      <label htmlFor="maxParticipants" className="block text-base font-medium text-gray-700">
                        Max Participants
                      </label>
                      <Field
                        type="number"
                        name="maxParticipants"
                        id="maxParticipants"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md 
                          text-base py-3 px-4 ${
                          errors.maxParticipants && touched.maxParticipants ? 'border-red-300' : ''
                        }`}
                      />
                      <ErrorMessage name="maxParticipants" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        What's Included
                      </label>
                      <FieldArray name="included">
                        {({ remove, push }) => (
                          <div>
                            {values.included && values.included.length > 0 ? (
                              values.included.map((item, index) => (
                                <div key={index} className="flex items-center mb-2">
                                  <Field
                                    name={`included.${index}`}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md text-base py-3 px-4"
                                    placeholder="E.g., Equipment rental"
                                  />
                                  <button
                                    type="button"
                                    className="ml-2 text-red-500 p-3"
                                    onClick={() => remove(index)}
                                  >
                                    <i className="fas fa-trash text-base"></i>
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500 text-base">No items added</div>
                            )}
                            <button
                              type="button"
                              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                              onClick={() => push('')}
                            >
                              <i className="fas fa-plus mr-2"></i> Add Item
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                    
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Not Included
                      </label>
                      <FieldArray name="notIncluded">
                        {({ remove, push }) => (
                          <div>
                            {values.notIncluded && values.notIncluded.length > 0 ? (
                              values.notIncluded.map((item, index) => (
                                <div key={index} className="flex items-center mb-2">
                                  <Field
                                    name={`notIncluded.${index}`}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md text-base py-3 px-4"
                                    placeholder="E.g., Gratuities"
                                  />
                                  <button
                                    type="button"
                                    className="ml-2 text-red-500 p-3"
                                    onClick={() => remove(index)}
                                  >
                                    <i className="fas fa-trash text-base"></i>
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500 text-base">No items added</div>
                            )}
                            <button
                              type="button"
                              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                              onClick={() => push('')}
                            >
                              <i className="fas fa-plus mr-2"></i> Add Item
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                    
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Requirements
                      </label>
                      <FieldArray name="requirements">
                        {({ remove, push }) => (
                          <div>
                            {values.requirements && values.requirements.length > 0 ? (
                              values.requirements.map((item, index) => (
                                <div key={index} className="flex items-center mb-2">
                                  <Field
                                    name={`requirements.${index}`}
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md text-base py-3 px-4"
                                    placeholder="E.g., Minimum age: 8 years"
                                  />
                                  <button
                                    type="button"
                                    className="ml-2 text-red-500 p-3"
                                    onClick={() => remove(index)}
                                  >
                                    <i className="fas fa-trash text-base"></i>
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500 text-base">No requirements added</div>
                            )}
                            <button
                              type="button"
                              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                              onClick={() => push('')}
                            >
                              <i className="fas fa-plus mr-2"></i> Add Requirement
                            </button>
                          </div>
                        )}
                      </FieldArray>
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
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <Field
                        as="select"
                        name="status"
                        id="status"
                        className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Field>
                      <div className="mt-1 text-sm text-gray-500">
                        Inactive activities will not be shown on the website
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Image Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Main Activity Image</h3>
                  
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
                    {images.length === 0 && (
                      <div className="h-32 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center">
                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                          {uploading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                          ) : (
                            <>
                              <i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
                              <span className="mt-2 block text-sm font-medium text-gray-700">
                                Add Main Image
                              </span>
                            </>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    This image will be used as the main image for the activity in listings and the detail page.
                  </p>
                </div>
                
                {/* Gallery Images Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Gallery Images</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="relative">
                        <img 
                          src={image.url} 
                          alt="Gallery" 
                          className="h-32 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(image.id)}
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
                            <i className="fas fa-images text-3xl text-gray-400"></i>
                            <span className="mt-2 block text-sm font-medium text-gray-700">
                              Add Gallery Images
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryImageUpload}
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Add additional images for the activity gallery on the detail page. You can upload multiple images at once.
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
