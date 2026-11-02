import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const REACT_VENDOR_MODULES = ['react', 'react-dom', 'react-router', 'scheduler'];
const THREE_VENDOR_MODULES = ['three', '@react-three', 'maath', 'meshline'];
const ANIMATION_VENDOR_MODULES = ['gsap', '@react-spring'];

/**
 * Groups third-party dependencies into stable, cacheable chunks.
 * `three` is deliberately isolated so it is only downloaded when the
 * lazily-loaded 3D keyboard scene is requested. Everything else stays in the
 * default chunk: a catch-all vendor chunk creates circular chunks.
 */
function resolveVendorChunk(moduleId) {
  // Vite's own preload helper is a virtual module shared by the entry and the
  // lazy chunks. Without an explicit home Rollup can place it inside
  // `vendor-three`, which would make the entry import three.js eagerly.
  if (moduleId.includes('vite/preload-helper')) {
    return 'vendor-react';
  }

  if (!moduleId.includes('node_modules')) {
    return undefined;
  }

  if (THREE_VENDOR_MODULES.some((name) => moduleId.includes(`/${name}`))) {
    return 'vendor-three';
  }

  if (ANIMATION_VENDOR_MODULES.some((name) => moduleId.includes(`/${name}`))) {
    return 'vendor-animation';
  }

  if (REACT_VENDOR_MODULES.some((name) => moduleId.includes(`/${name}`))) {
    return 'vendor-react';
  }

  return undefined;
}

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // `vendor-three` is ~860 kB raw but is lazily fetched and never part of the
    // initial payload; the default 500 kB warning is therefore not actionable.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: resolveVendorChunk,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: false,
    include: ['src/**/*.test.{js,jsx}'],
  },
});
