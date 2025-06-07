import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

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
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);