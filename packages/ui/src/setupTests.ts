import '@testing-library/jest-dom';
import { beforeAll, afterAll, vi } from 'vitest';

beforeAll(() => {
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
