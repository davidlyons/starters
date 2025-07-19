import { defineConfig } from 'vite'
import restart from 'vite-plugin-restart'

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  server: {
    host: true,
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox
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
