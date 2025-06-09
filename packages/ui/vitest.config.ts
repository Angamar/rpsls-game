import { defineConfig } from 'vitest/config';
import base from '../../vitest.config.base';
import react from '@vitejs/plugin-react';

export default defineConfig({
  ...base,
  plugins: [react()],
  test: {
    ...base.test,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
