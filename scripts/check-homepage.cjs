/** Homepage smoke checks. Start Next.js, then run: node scripts/check-homepage.cjs */
const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const baseURL = process.env.HOMEPAGE_TEST_URL || 'http://localhost:3000';
  const errors = [];
  try {
    await fs.mkdir('exports/homepage-redesign', { recursive: true });
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    // Allow existing video thumbnails for visual QA; block analytics and forms.
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      return url.origin === new URL(baseURL).origin || url.hostname === 'i.ytimg.com' ? route.continue() : route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    for (const viewport of [
      { width: 1440, height: 900 }, { width: 1280, height: 720 },
      { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 740 },
    ]) {
      await page.setViewportSize(viewport);
      const response = await page.goto(baseURL, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('main').count(), 1);
      assert.match(await page.title(), /Live AI Call Coaching/);
      const width = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: innerWidth }));
      assert.ok(width.content <= width.viewport, `Horizontal overflow at ${viewport.width}: ${JSON.stringify(width)}`);
      const cta = page.locator('[data-analytics-id="cta-download-hero"]');
      const ctaBox = await cta.boundingBox();
      assert.ok(ctaBox.y + ctaBox.height < viewport.height, `Hero CTA below fold at ${viewport.width}`);
      const figure = page.getByRole('figure');
      const startHeight = (await figure.boundingBox()).height;
      for (const label of ['A detail matters', 'There’s a next step', 'An objection comes up']) {
        const button = page.getByRole('button', { name: label, exact: false });
        await button.focus();
        await page.keyboard.press('Enter');
        assert.equal(await button.getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('[aria-pressed="true"]').count(), 1);
        const currentHeight = (await figure.boundingBox()).height;
        assert.ok(Math.abs(currentHeight - startHeight) < 2, `Example causes layout shift at ${viewport.width} (${label}): ${startHeight} -> ${currentHeight}`);
      }
      await page.getByText('Does Sayso make calls for me?', { exact: true }).click();
      assert.ok(await page.getByText('You make the calls and lead the conversation.', { exact: false }).isVisible());
      await page.getByText('Does Sayso make calls for me?', { exact: true }).click();
      await cta.click();
      assert.ok(await page.getByRole('heading', { name: 'What system do you use?' }).isVisible());
      await page.getByRole('button', { name: 'Close', exact: true }).click();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `exports/homepage-redesign/hero-${viewport.width}.png` });
      if ([1440, 390].includes(viewport.width)) {
        await page.screenshot({ path: `exports/homepage-redesign/page-${viewport.width}.png`, fullPage: true });
      }
      console.log(`PASS ${viewport.width}x${viewport.height}: layout, first-fold CTA, keyboard examples, FAQ, download`);
    }
    const hrefs = await page.locator('main a[href^="/"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')))]);
    for (const href of hrefs) {
      const response = await context.request.get(new URL(href, baseURL).href);
      assert.equal(response.status(), 200, `Broken homepage link: ${href}`);
    }
    console.log(`PASS ${hrefs.length} homepage link destinations`);
    const noJs = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await noJs.newPage();
    await staticPage.goto(baseURL, { waitUntil: 'domcontentloaded' });
    assert.ok(await staticPage.getByRole('heading', { level: 1 }).isVisible());
    await staticPage.getByText('What is Sayso?', { exact: true }).click();
    assert.ok(await staticPage.getByText('Sayso is an AI call coach for real estate agents.', { exact: false }).isVisible());
    await noJs.close();
    console.log('PASS server-rendered headline and native FAQ without JavaScript');
    assert.deepEqual(errors, [], 'Browser runtime errors');
    console.log('PASS no browser runtime errors');
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
