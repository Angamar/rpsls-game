import '@testing-library/jest-dom';
import { beforeAll, afterAll, vi } from 'vitest';

beforeAll(() => {
  // Make vi globally available
  globalThis.vi = vi;

  globalThis.fetch = vi.fn(() =>
    Promise.resolve(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    ),
  );
});

afterAll(() => {
  // Restore mocks or clean up resources
  vi.restoreAllMocks();
});
