import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
      globals: true,
      setupFiles: './vi_testing/setup.js', // Adjust path if necessary
      environment: 'jsdom',
  },
  server: {
      port: 3000
  }
})
