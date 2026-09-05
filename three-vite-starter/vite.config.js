import { defineConfig } from 'vite'
import restart from 'vite-plugin-restart'

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  server: {
    host: true,
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [
    restart({ restart: ['../static/**'] }), // Restart server on static file change
  ],
})
