import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    testTransformMode: {
      web: ['\\.vue$'],
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      all: true,
    },
  },
  plugins: [vue()],
});
