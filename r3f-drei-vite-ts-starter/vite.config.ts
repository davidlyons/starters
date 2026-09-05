import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  root: 'src/',
  publicDir: '../public/',
  base: './',
  plugins: [react()],
  server: {
    host: true,
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    // sourcemap: true,
  },
})
