import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    // CRITICAL FIX: Redirects all requests starting with /api to the Node.js backend
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // The rewrite rule ensures the URL path is correctly passed to Express
        rewrite: (path) => path.replace(/^\/api/, '/api'), 
      },
    },
  },
})