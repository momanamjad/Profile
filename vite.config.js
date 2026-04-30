
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VERCEL ? '/' : '/Portfolio/', // set this to '/' for Vercel and '/Portfolio/' for GitHub Pages
  build: {
    // Split large vendors into separate chunks so the browser can cache them individually
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group ALL Three.js code (core + addons) into one cacheable chunk
          if (id.includes('node_modules/three')) return 'three';
          // Rapier physics engine — loaded dynamically, cached separately
          if (id.includes('@dimforge/rapier3d-compat')) return 'rapier';
          // Keep Rapier 2D separate too if it's pulled in
          if (id.includes('@dimforge/rapier2d-compat')) return 'rapier2d';
        },
      },
    },
    // Increase limit for large but necessary physics library (888KB gzipped is reasonable)
    chunkSizeWarningLimit: 3000,
    // Minify CSS
    cssMinify: true,
    // Use terser for better JS minification (smaller output than esbuild default)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Strip console.log in production builds
        passes: 2,           // Extra compression pass
      },
    },
    // Generate source maps for debugging but keep them separate
    sourcemap: false,
  },
  // Ensure .glb files are handled as assets
  assetsInclude: ['**/*.glb', '**/*.gltf'],
});