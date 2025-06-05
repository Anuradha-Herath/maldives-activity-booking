import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  server: {
    port: process.env.PORT || 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    include: ['axios']
  },  define: {
    // Make env variables available in your client code
    'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL || 'https://maldives-activity-booking-production.up.railway.app/api/v1'),
    'process.env.REACT_APP_CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dwzhs42tz'),
    'process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET': JSON.stringify(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'maldives_activities'),
  }
});