// Renders scripts/og-card.html at exactly 1200x630 and writes public/og.png.
// Uses the chromium that @playwright/test installs (see task 220); no image library,
// no paid service, no network.
import { chromium } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const cardPath = resolve(here, 'og-card.html');
const outPath = resolve(here, '..', 'public', 'og.png');

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

await page.goto(pathToFileURL(cardPath).href, { waitUntil: 'load' });

// The logo is a local file, so `load` normally covers it, but wait on the element itself
// rather than a fixed timeout so a slow decode can never ship a card with a missing logo.
await page.waitForFunction(() => {
  const img = document.getElementById('logo');
  return Boolean(img && img.complete && img.naturalWidth > 0);
});

await page.screenshot({ path: outPath, type: 'png' });
await browser.close();

console.log(`wrote ${outPath}`);
