
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VERCEL ? '/' : '/Portfolio/', // set this to '/' for Vercel and '/Portfolio/' for GitHub Pages
  build: {
    // Split large vendors into separate chunks so the browser can cache them individually
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three';
          if (id.includes('@dimforge/rapier3d-compat')) return 'rapier';
        },
      },
    },
    // Enable gzip-friendly output
    chunkSizeWarningLimit: 2000,
    // Minify CSS
    cssMinify: true,
  },
  // Ensure .glb files are handled as assets
  assetsInclude: ['**/*.glb', '**/*.gltf'],
});