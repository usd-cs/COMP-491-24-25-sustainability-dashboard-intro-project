import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.vue', '.json'],
  },
  // Add Vitest-specific configurations
  test: {
    globals: true,           // Enable global functions like `describe` and `it`
    environment: 'jsdom',     // Use jsdom for DOM-related tests
  },
});
