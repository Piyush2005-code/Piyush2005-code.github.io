import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    {
      name: 'rename-html',
      enforce: 'post',
      generateBundle(options, bundle) {
        if (bundle['react.html']) {
          bundle['index.html'] = {
            ...bundle['react.html'],
            fileName: 'index.html'
          };
          delete bundle['react.html'];
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'react.html')
      }
    }
  }
});
