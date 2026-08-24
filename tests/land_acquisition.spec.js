import { test, expect } from '@playwright/test';

test.describe('BhoomiDrishti — Land Acquisition Tracking System (SIH26016)', () => {

  test('Page loads correctly with title and all navigation tabs', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page).toHaveTitle(/BhoomiDrishti/);

    // Verify brand title
    await expect(page.getByText('BhoomiDrishti')).toBeVisible();

    // Verify navigation tabs
    await expect(page.getByRole('button', { name: /National MIS/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /GIS & Stage Tracker/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Workflow & SLAs/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /ML Delay Predictor/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Field Mobile App/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Public Portal/i })).toBeVisible();
  });

  test('Module 0: National Executive MIS Dashboard & Custom Report Export', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await expect(page.getByText('National Land Acquisition MIS & Governance Dashboard')).toBeVisible();
    await expect(page.getByText('Land Area Notified vs Acquired')).toBeVisible();

    // Export Report
    await page.getByRole('button', { name: /Export MIS Report/i }).click();
    await expect(page.getByText(/Custom MIS Report \(PDF\) generated/i)).toBeVisible();
  });

  test('Module 1: GIS Tracker displays stats, map, and parcel details', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Click on GIS Tracker tab
    await page.getByRole('button', { name: /GIS & Stage Tracker/i }).click();

    // Check stats cards
    await expect(page.locator('.stat-label').filter({ hasText: 'Total Parcels' })).toBeVisible();
    await expect(page.locator('.stat-label').filter({ hasText: 'Section 4 (Notification)' })).toBeVisible();

    // Search for a Khasra number
    await page.getByPlaceholder(/Search Khasra No/i).fill('142/1A');
    await expect(page.getByText('Khasra No. 142/1A')).toBeVisible();
    await expect(page.getByText('Rameshwar Patil')).toBeVisible();
  });

  test('Module 2: Workflow Engine document verification, document vault, and SLA queue', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Switch to Workflow & SLAs module
    await page.getByRole('button', { name: /Workflow & SLAs/i }).click();

    await expect(page.getByText('Revenue Officer Workflow & SLA Control Engine')).toBeVisible();

    // Switch to Document Repository tab
    await page.getByRole('button', { name: /Secure Document Repository/i }).click();
    await expect(page.getByText('Secure Document Repository, Version Control & Audit Vault')).toBeVisible();
  });

  test('Module 3: ML Delay Predictor simulation', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Switch to ML Delay Predictor
    await page.getByRole('button', { name: /ML Delay Predictor/i }).click();

    await expect(page.getByText('AI/ML Land Acquisition Delay Predictor')).toBeVisible();
    await expect(page.getByText('Predictive Bottleneck Alert Feed')).toBeVisible();
  });

  test('Module 4: Mobile Field Data Collection Tool', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Switch to Field Mobile App
    await page.getByRole('button', { name: /Field Mobile App/i }).click();

    await expect(page.getByText('Mobile Field Data Collection & Geo-Tagging Tool')).toBeVisible();

    // Capture GPS
    await page.getByRole('button', { name: /Acquire Live Device GPS/i }).click();
    await expect(page.getByText(/GPS Coordinates Locked/i)).toBeVisible();
  });

  test('Online Proposal Submission Modal opens and submits proposal', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Click Submit Proposal button
    await page.getByRole('button', { name: /Submit Proposal/i }).click();

    await expect(page.getByText('Online Land Acquisition Proposal Submission')).toBeVisible();

    // Fill title
    await page.getByPlaceholder(/Samruddhi Mahamarg Feeder/i).fill('Mumbai-Goa Coastal Highway Expansion');
    await page.getByRole('button', { name: /Submit Proposal for Collector Scrutiny/i }).click();

    await expect(page.getByText(/Proposal Submitted Successfully/i)).toBeVisible();
  });

});
