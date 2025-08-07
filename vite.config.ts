import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig({
    base: '/front_6th_chapter2-2/',
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          'index.origin': 'index.origin.html',
          'index.basic': 'index.basic.html',
          'index.advanced': 'index.advanced.html',
        },
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  })
);
