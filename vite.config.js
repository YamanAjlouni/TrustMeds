import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.config.js/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the real backend during development
      '/api': {
        target: 'https://malazshukri.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // Keep the /api prefix
      },
    },
  },
});