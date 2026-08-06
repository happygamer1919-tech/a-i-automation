import { test, expect, type Page } from '@playwright/test';

/**
 * Baseline smoke suite for a-and-i-automation.com.
 *
 * Every assertion here describes behaviour that is TRUE of the site today. The
 * point is to pin it down so a regression is caught by machine rather than by
 * the owner, who does not read code (see CLAUDE.md).
 */

/**
 * The boot overlay is a CSS-module class, so its rendered name is
 * `BootScreen_boot__<hash>`. The trailing double underscore matters: it keeps
 * this from also matching the sibling `BootScreen_boot_ready__<hash>`.
 * A `data-testid` on the overlay would be sturdier, but this suite is not
 * allowed to touch `src/` — see the BACKLOG note in the commit body.
 */
const BOOT_OVERLAY = '[class*="BootScreen_boot__"]';

/** Languages in the order `LANGS` declares them in src/lib/i18n.ts. */
const LANGUAGES = [
  { code: 'ro', label: 'RO' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
] as const;

/** Collects every console error and uncaught exception raised by the page. */
function watchForErrors(page: Page): string[] {
  const problems: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`console.error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
  return problems;
}

/** Below the `--bp-md` breakpoint the nav collapses behind a burger. */
async function revealNav(page: Page) {
  const burger = page.getByRole('button', { name: 'Toggle menu' });
  if (await burger.isVisible()) await burger.click();
}

test.describe('page shell', () => {
  test('serves 200 and renders exactly one <h1>', async ({ page }) => {
    const response = await page.goto('/');

    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).not.toBeEmpty();
  });

  test('loads and scrolls end to end without console errors', async ({ page }) => {
    const problems = watchForErrors(page);

    await page.goto('/');
    await expect(page.locator(BOOT_OVERLAY)).toHaveCount(0, { timeout: 30_000 });

    // Walk every section so scroll-triggered code (GSAP ScrollTrigger, Lenis,
    // the pinned process rail, the Three.js stack orbital) actually executes.
    for (const id of ['problems', 'services', 'process', 'stack', 'why-us', 'contact']) {
      await page.locator(`[id="${id}"]`).scrollIntoViewIfNeeded();
    }
    await expect(page.locator('#contact form')).toBeVisible();

    expect(problems).toEqual([]);
  });

  test('does not overflow horizontally', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(BOOT_OVERLAY)).toHaveCount(0, { timeout: 30_000 });

    // This bug class shipped twice on the sister project. Pin it before it happens.
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBe(innerWidth);
  });
});

test.describe('boot screen', () => {
  test('never gates the hero, and clears itself without interaction', async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit' });

    // The contract that matters: the hero is in the DOM immediately, whatever the
    // overlay is doing on top of it. Measured at 25-40ms; 1.5s is a wide margin.
    await page.locator('h1').first().waitFor({ state: 'attached', timeout: 1500 });
    await expect(page.locator('h1')).not.toBeEmpty();

    // The overlay then retires on its own — no key, no tap.
    //
    // The design budget is ~1s (5 lines x 90ms + 200ms hold + 400ms fade) and a
    // real GPU browser hits it (measured 1.1-1.4s). Headless Chromium has no GPU,
    // so the hero's WebGL scene runs on SwiftShader and starves the boot timer's
    // setInterval: the overlay lingers 2.6s (375px) to 6.4s (1440px). That is an
    // artifact of software rasterisation, not of the boot screen, so the ceiling
    // here only guards the real regression — an overlay that never leaves.
    // The underlying main-thread cost is a genuine finding, filed as P4-3.
    await expect(page.locator(BOOT_OVERLAY)).toHaveCount(0, { timeout: 30_000 });

    // Proof the animated path ran to completion rather than being short-circuited.
    const bootDone = await page.evaluate(() => sessionStorage.getItem('boot_done'));
    expect(bootDone).toBe('1');
  });
});

test.describe('with prefers-reduced-motion: reduce', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

  test('skips the boot screen entirely and renders the hero immediately', async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit' });

    await page.locator('h1').first().waitFor({ state: 'attached', timeout: 1500 });

    // The overlay is server-rendered into the static HTML, so it exists for the
    // handful of frames before hydration; the effect then drops it. Measured gone
    // at 68-88ms.
    await expect(page.locator(BOOT_OVERLAY)).toHaveCount(0, { timeout: 5_000 });
    await expect(page.locator('h1')).not.toBeEmpty();

    // Exact discriminator: the animation path sets `boot_done` when it finishes.
    // Under reduced motion BootScreen returns before that, so a null value proves
    // the sequence was skipped rather than merely completing quickly.
    const bootDone = await page.evaluate(() => sessionStorage.getItem('boot_done'));
    expect(bootDone).toBeNull();
  });
});

test.describe('internationalisation', () => {
  test('renders the hero headline in all three languages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(BOOT_OVERLAY)).toHaveCount(0, { timeout: 30_000 });
    await revealNav(page);

    const heading = page.locator('h1');
    const seen: string[] = [];

    for (const { code, label } of LANGUAGES) {
      // Drive the real control, not provider internals.
      await page.getByRole('button', { name: label, exact: true }).click();

      await expect(page.locator('html')).toHaveAttribute('lang', code);
      const headline = (await heading.innerText()).trim();

      expect(headline, `${label} headline must not be empty`).not.toBe('');
      expect(seen, `${label} headline must differ from the other languages`).not.toContain(headline);
      seen.push(headline);

      // Translated copy has different lengths; none of it may burst the viewport.
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(scrollWidth, `${label} must not cause horizontal overflow`).toBe(innerWidth);
    }

    expect(seen).toHaveLength(LANGUAGES.length);
  });
});

test.describe('navigation', () => {
  test('every nav anchor points at a section that exists', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(BOOT_OVERLAY)).toHaveCount(0, { timeout: 30_000 });

    const hrefs = await page
      .locator('nav a[href]')
      .evaluateAll((links) => links.map((l) => l.getAttribute('href') ?? ''));

    // P3-1a shipped nav items as real anchors so sections are shareable and
    // indexable. Guard both halves: they stay anchors, and they stay resolvable.
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      expect(href, 'nav links must be real in-page anchors').toMatch(/^#\S+$/);
      const id = href.slice(1);
      await expect(page.locator(`[id="${id}"]`), `#${id} must exist`).toHaveCount(1);
    }
  });
});

test.describe('contact form', () => {
  // Deliberately never submitted: it posts to the live Telegram lead proxy.
  test('exists, is wired to a handler, and requires the fields the lead needs', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(BOOT_OVERLAY)).toHaveCount(0, { timeout: 30_000 });

    const form = page.locator('#contact form');
    await expect(form).toBeVisible();

    for (const field of ['name', 'phone', 'company', 'description']) {
      await expect(form.locator(`[name="${field}"]`)).toHaveAttribute('required', '');
    }

    await expect(form.locator('button[type="submit"]')).toBeVisible();

    // Honeypot the spam filter depends on — hidden from humans, must stay present.
    await expect(form.locator('[name="website"]')).toHaveCount(1);

    const wiring = await form.evaluate((el: HTMLFormElement) => {
      const propsKey = Object.keys(el).find((k) => k.startsWith('__reactProps$'));
      const props = propsKey ? (el as unknown as Record<string, { onSubmit?: unknown }>)[propsKey] : null;
      return {
        action: el.getAttribute('action'),
        hasSubmitHandler: typeof props?.onSubmit === 'function',
      };
    });

    expect(
      wiring.action !== null || wiring.hasSubmitHandler,
      'form must have either an action or a submit handler, or leads go nowhere',
    ).toBe(true);
  });
});
