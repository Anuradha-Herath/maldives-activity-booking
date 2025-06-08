import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { wakeUpBackend } from './utils/wakeUpBackend';
import './utils/registerServiceWorker';

// Add Google Fonts for the display font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Validate environment variables
if (import.meta.env.DEV) {
  console.log('Running in development mode');
} else {
  // Log important environment variables for debugging in production
  console.log('Running in production mode');
  
  // Check API URL format
  const apiUrl = import.meta.env.VITE_API_URL;
  if (typeof apiUrl === 'string') {
    if (apiUrl.startsWith('VITE_API_URL=')) {
      console.warn('⚠️ API URL has incorrect format (includes variable name). This will be fixed by authService.');
    }
    console.log('API URL:', apiUrl);
  } else {
    console.warn('⚠️ API URL not set correctly in environment variables');
  }
  
  // Wake up the backend server if it's in sleep mode (common with free deployment services)
  try {
    console.log('Attempting to wake up backend server...');
    wakeUpBackend()
      .then(result => {
        if (result.success) {
          console.log('✅ Backend server is awake and ready:', result.message);
        } else {
          console.warn('⚠️ Backend server may be initializing:', result.message);
          console.log('The application will continue loading, but some features may be delayed.');
        }
      })
      .catch(error => {
        console.error('❌ Failed to wake up backend server:', error);
        console.log('The application will continue loading, but API features may not work immediately.');
      });
  } catch (error) {
    console.error('Error in wake up process:', error);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);