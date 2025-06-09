import React, { useState } from 'react';
import axios from 'axios';
import { activitiesAPI } from './api';

const DebugUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Use the API utility for consistent URL handling
  const API_URL = activitiesAPI.baseUrl;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    setUploading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file:', file.name);
      
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', response.data);
      setResult(response.data);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Debug Image Upload</h2>
      
      <div className="mb-4">
        <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-2">
          Select an Image
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          name="imageUpload"
        />
      </div>
      
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {uploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : (
          'Upload Image'
        )}
      </button>
      
      {result && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <h3 className="text-sm font-medium text-green-800 mb-2">Upload Successful</h3>
          <div className="text-xs text-green-700">
            <p>URL: {result.data.url}</p>
            {result.data.public_id && <p>Public ID: {result.data.public_id}</p>}
          </div>
          {result.data.url && (
            <div className="mt-2">
              <img src={result.data.url} alt="Uploaded" className="h-32 w-auto" />
            </div>
          )}
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <h3 className="text-sm font-medium text-red-800 mb-1">Upload Failed</h3>
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DebugUpload;
