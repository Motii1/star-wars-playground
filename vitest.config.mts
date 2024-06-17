import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 30000,
    include: ['./src/**/*.spec.ts'],
    root: './',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    reporters: ['basic', 'junit'],
    outputFile: './junit-unit.xml',
  },
  plugins: [swc.vite()],
});
