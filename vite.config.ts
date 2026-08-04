import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Used only when VITE_API_URL=/api/v1
      // Prefer pointing .env to gold/local backend URL for simpler local setup.
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'https://igsc-backend-gold.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
