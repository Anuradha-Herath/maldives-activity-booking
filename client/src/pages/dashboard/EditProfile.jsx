import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

const EditProfile = () => {
  const { currentUser, updateProfile, updatePassword } = useAuth();
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile validation schema
  const profileSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });
  
  // Password validation schema
  const passwordSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Current password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
  
  // Handle profile update
  const handleProfileUpdate = async (values, { setSubmitting, setFieldError }) => {
    try {
      // In a real app, you would make an API call to update the user profile
      await updateProfile({ name: values.name });
      
      setProfileUpdated(true);
      setTimeout(() => {
        setProfileUpdated(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setFieldError('general', 'Failed to update profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle password update
  const handlePasswordUpdate = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      // In a real app, you would make an API call to update the password
      await updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      
      resetForm();
      setPasswordUpdated(true);
      setTimeout(() => {
        setPasswordUpdated(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.response?.status === 401) {
        setFieldError('currentPassword', 'Current password is incorrect');
      } else {
        setFieldError('general', 'Failed to update password. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Edit Profile">
      <div>
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'password' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Password
            </button>
          </nav>
        </div>
        
        {/* Profile Information Form */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-5">Edit Personal Information</h2>
            
            {profileUpdated && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                <span>Your profile has been successfully updated.</span>
              </div>
            )}
            
            <Formik
              initialValues={{
                name: currentUser?.name || '',
                email: currentUser?.email || '',
              }}
              validationSchema={profileSchema}
              onSubmit={handleProfileUpdate}
              enableReinitialize
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                      {errors.general}
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        disabled // Email cannot be changed for this example
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                      />
                      <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                      <p className="mt-1 text-xs text-gray-500">Email address cannot be changed for security reasons.</p>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </div>
                        ) : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
        
        {/* Password Form */}
        {activeTab === 'password' && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-5">Change Password</h2>
            
            {passwordUpdated && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                <span>Your password has been successfully updated.</span>
              </div>
            )}
            
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={passwordSchema}
              onSubmit={handlePasswordUpdate}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                      {errors.general}
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <Field
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage name="currentPassword" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <Field
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage name="newPassword" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </div>
                        ) : 'Change Password'}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Password Requirements:</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Minimum 6 characters long</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;
