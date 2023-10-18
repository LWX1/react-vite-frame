import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src")
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:55222',
        rewrite:(path) => path.replace(/^\/api/, '')
      }
    },
    
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import './src/assets/css/variable.scss';"
      }
    }
  },
  
})
