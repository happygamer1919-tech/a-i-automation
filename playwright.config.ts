import { defineConfig, devices } from '@playwright/test';

const PORT = 3900;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * The site ships as a static export to GitHub Pages (`output: 'export'`,
 * `trailingSlash: true`). Tests therefore run against `next build`'s `out/`
 * directory served as plain files — not against `next dev` — so what is asserted
 * is what actually ships.
 *
 * Headless Chromium has no GPU, so the Three.js hero scene renders through
 * SwiftShader and saturates the main thread. Timeouts are deliberately generous
 * for that reason; see the note on the boot-screen test in tests/smoke.spec.ts.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 120_000,
  expect: { timeout: 20_000 },

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 }, hasTouch: true },
    },
  ],

  webServer: {
    // `serve` resolves `out/index.html` at `/`, which is what `trailingSlash: true`
    // produces for the single route this site has.
    command: `npm run build && npx serve out -l ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
