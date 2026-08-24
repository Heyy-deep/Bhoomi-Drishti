import { test, expect } from '@playwright/test';

test.describe('BhoomiDrishti — Performance & Bottleneck Analysis', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('button', { name: /NHAI Officer/i }).click();
    await page.getByRole('button', { name: /Sign In to Dashboard/i }).click();
    await expect(page.getByText('BhoomiDrishti').first()).toBeVisible();
  });
  test('Analyze all modules for console errors and slow network requests', async ({ page }) => {
    const errors = [];
    const slowRequests = [];

    // 1. Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(`Console Error: ${msg.text()}`);
      }
    });

    // 2. Listen for uncaught exceptions
    page.on('pageerror', exception => {
      errors.push(`Uncaught Exception: ${exception.message}`);
    });

    // 3. Monitor network bottlenecks (requests taking > 1000ms)
    page.on('requestfinished', async request => {
      const timing = request.timing();
      if (timing && timing.responseEnd > 0) {
        const duration = timing.responseEnd - timing.requestStart;
        if (duration > 1000) {
          slowRequests.push(`Slow Request (${Math.round(duration)}ms): ${request.url()}`);
        }
      }
    });

    page.on('requestfailed', request => {
      const errorText = request.failure()?.errorText;
      const url = request.url();
      // Ignore harmless Leaflet map tile aborts when navigating quickly
      if (url.includes('tile.openstreetmap.org') && errorText === 'net::ERR_ABORTED') {
        return;
      }
      errors.push(`Failed Request: ${url} - ${errorText}`);
    });

    // 4. Start navigation and measure metrics
    console.log('Starting Bottleneck Analysis...');
    const startTime = Date.now();
    
    const loadTime = Date.now() - startTime;
    console.log(`Initial Load Time (networkidle): ${loadTime}ms`);

    // Verify Title
    await expect(page).toHaveTitle(/BhoomiDrishti/);

    const tabs = [
      'National MIS',
      'GIS & Stage Tracker',
      'Workflow & SLAs',
      'ML Delay Predictor',
      'Field Mobile App',
      'Public Portal'
    ];

    for (const tabName of tabs) {
      console.log(`Analyzing Module: ${tabName}`);
      const tabStart = Date.now();
      
      // Click the tab
      await page.getByRole('button', { name: new RegExp(tabName, 'i') }).click();
      
      // Wait for a short time to allow re-renders and data fetching
      await page.waitForTimeout(500); 
      
      const tabRenderTime = Date.now() - tabStart;
      console.log(`Render Time for ${tabName}: ${tabRenderTime}ms`);
    }

    // Modal check
    console.log(`Analyzing Modal: Submit Proposal`);
    await page.getByRole('button', { name: /Submit Proposal/i }).click();
    await expect(page.getByText('Online Land Acquisition Proposal Submission')).toBeVisible();
    await page.locator('.close-modal-btn').click();

    console.log('--- BOTTLENECK REPORT ---');
    console.log(`Total Console/Page Errors: ${errors.length}`);
    if (errors.length > 0) console.log(errors.join('\n'));
    
    console.log(`Total Slow Requests (>1s): ${slowRequests.length}`);
    if (slowRequests.length > 0) console.log(slowRequests.join('\n'));
    
    // Assert no catastrophic errors
    expect(errors.length).toBe(0);
  });

});
