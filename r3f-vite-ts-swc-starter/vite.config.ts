import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/

export default defineConfig({
  root: 'src/',
  publicDir: '../public/',
  base: './',
  plugins: [react()],
  server: {
    host: true,
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    // sourcemap: true,
  },
});
