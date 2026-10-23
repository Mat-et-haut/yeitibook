import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  testMatch: '*.spec.ts',
  reporter: [['list'], ['json', { outputFile: 'tests/resultats/resultats.json' }]],
  use: { baseURL: 'http://127.0.0.1:6007' },
  webServer: {
    command: 'python3 -m http.server 6007 --bind 127.0.0.1 --directory apps/docs/dist',
    url: 'http://127.0.0.1:6007/index.json',
    reuseExistingServer: !process.env.CI,
  },
});
