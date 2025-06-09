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
    port: 3000,
    proxy: {
      '/api/v1': {
        target: 'https://maldives-activity-booking-backend.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1')
      }
    }
  },
  optimizeDeps: {
    include: ['axios']
  }
});