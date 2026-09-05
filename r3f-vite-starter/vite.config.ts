import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/

export default {
  root: 'src/',
  publicDir: '../public/',
  base: './',
  plugins: [react()],
  server: {
    host: true, // Open to local network and display URL
    open: true,
  },
  build: {
    outDir: '../dist', // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
}
