import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['./test/**/*.e2e-spec.ts'],
    root: './',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    reporters: ['basic', 'junit'],
    outputFile: './junit-e2e.xml',
    hookTimeout: 100000,
    testTimeout: 100000,
    globalSetup: ['./test/test-app/test-containers/vitest-global-setup.ts'],
  },
  plugins: [swc.vite()],
});
