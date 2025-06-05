import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionTest = () => {
  const [apiStatus, setApiStatus] = useState('Testing...');
  const [error, setError] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  
  useEffect(() => {
    // Get API URL from environment
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
    setApiUrl(apiUrl);
    
    // Test connection
    const testConnection = async () => {
      try {
        // First try the debug connection endpoint
        const response = await axios.get(`${apiUrl}/debug/connection`);
        
        setApiStatus(`Connection successful! Server responded with: ${JSON.stringify(response.data)}`);
      } catch (err) {
        console.error('Connection error:', err);
        // Try a more basic endpoint if debug one fails
        try {
          const response = await axios.get(`${apiUrl}/activities?limit=1`);
          setApiStatus(`Basic API connection works, but debug endpoint failed. Got ${response.data.data.length} activities.`);
        } catch (secondErr) {
          setError(`Failed to connect to API at ${apiUrl}. Error: ${err.message}`);
        }
      }
    };
    
    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="mb-4">
        <h2 className="font-semibold">API URL:</h2>
        <div className="bg-gray-100 p-3 rounded">{apiUrl}</div>
      </div>
      
      <div className="mb-4">
        <h2 className="font-semibold">Status:</h2>
        <div className={`p-3 rounded ${error ? 'bg-red-100' : 'bg-green-100'}`}>
          {error || apiStatus}
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Environment Variables:</h2>
        <div className="bg-gray-100 p-3 rounded">
          <p><strong>REACT_APP_API_URL:</strong> {process.env.REACT_APP_API_URL || 'Not set'}</p>
          <p><strong>REACT_APP_CLOUDINARY_CLOUD_NAME:</strong> {process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'Not set'}</p>
          <p><strong>REACT_APP_CLOUDINARY_UPLOAD_PRESET:</strong> {process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'Not set'}</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest;
