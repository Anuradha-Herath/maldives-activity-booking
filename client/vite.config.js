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
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    include: ['axios']
  },
  css: {
    // Enable CSS processing
    postcss: './postcss.config.js',
  },  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure the index.css is properly included in the build
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        assetFileNames: (assetInfo) => {
          // Special handling for the main index.css - place it at the root for direct access
          if (assetInfo.name === 'index.css') {
            return '[name][extname]';
          }
          // Ensure other CSS files keep their extension during build
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Ensure proper manifest generation
    manifest: true
  }
});