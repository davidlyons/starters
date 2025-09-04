import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  publicDir: '../public/',
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
