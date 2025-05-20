import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AdminLayout from '../../components/admin/AdminLayout';

const ActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const isNew = !id;

  useEffect(() => {
    // Fetch activity data if editing
    if (id) {
      const fetchActivity = async () => {
        try {
          // In a real app, this would be an API call
          // For now just simulate API call with setTimeout
          setTimeout(() => {
            const mockActivity = {
              id: parseInt(id),
              title: 'Scuba Diving Experience',
              description: 'Enjoy an amazing underwater adventure with professional instructors.',
              shortDescription: 'Discover the colorful marine life of the Maldives.',
              price: 149,
              duration: 3,
              location: 'Baa Atoll',
              type: 'water-sports',
              maxParticipants: 8,
              included: ['Equipment rental', 'Professional guide', 'Hotel pickup', 'Safety briefing'],
              notIncluded: ['Gratuities', 'Personal expenses'],
              featured: true,
              status: 'active',
              images: [
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
                'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800'
              ]
            };
            setActivity(mockActivity);
            setImages(mockActivity.images.map((url, index) => ({
              id: index,
              url,
              file: null,
              isUploaded: true
            })));
            setLoading(false);
          }, 800);
        } catch (error) {
          console.error('Error fetching activity:', error);
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
    shortDescription: Yup.string().required('Short description is required').max(150, 'Max 150 characters'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    duration: Yup.number().required('Duration is required').positive('Duration must be positive'),
    location: Yup.string().required('Location is required'),
    type: Yup.string().required('Activity type is required'),
    maxParticipants: Yup.number().required('Max participants is required').positive('Must be positive').integer('Must be a whole number'),
  });

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    // In a real app, you would upload to Cloudinary here
    
    setUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newImages = files.map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        file,
        isUploaded: true
      }));
      
      setImages([...images, ...newImages]);
      setUploading(false);
    }, 1500);
  };

  // Remove image
  const removeImage = (imageId) => {
    setImages(images.filter(image => image.id !== imageId));
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Combine images with form values
      const activityData = {
        ...values,
        images: images.map(img => img.url)
      };
      
      console.log('Saving activity data:', activityData);
      
      // In a real app, this would be an API call to save the data
      
      // Simulate API delay
      setTimeout(() => {
        setSubmitting(false);
        // Redirect back to activities list after save
        navigate('/admin/activities');
      }, 1000);
    } catch (error) {
      console.error('Error saving activity:', error);
      setSubmitting(false);
    }
  };

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
              maxParticipants: activity?.maxParticipants || '',
              included: activity?.included ? activity.included.join(', ') : '',
              notIncluded: activity?.notIncluded ? activity.notIncluded.join(', ') : '',
              featured: activity?.featured || false,
              status: activity?.status || 'active',
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
                      <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                        Short Description <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="textarea"
                        name="shortDescription"
                        id="shortDescription"
                        rows={2}
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.shortDescription && touched.shortDescription ? 'border-red-300' : ''
                        }`}
                        placeholder="Brief description for listings (max 150 chars)"
                      />
                      <ErrorMessage name="shortDescription" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Full Description <span className="text-red-500">*</span>
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
                          <option value="adventure">Adventure</option>
                          <option value="cultural">Cultural</option>
                          <option value="wellness">Wellness</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="mt-1 text-sm text-red-600" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
                        Max Participants <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="number"
                        name="maxParticipants"
                        id="maxParticipants"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.maxParticipants && touched.maxParticipants ? 'border-red-300' : ''
                        }`}
                      />
                      <ErrorMessage name="maxParticipants" component="div" className="mt-1 text-sm text-red-600" />
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
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <Field
                        as="select"
                        name="status"
                        id="status"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
