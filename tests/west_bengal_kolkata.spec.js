import { test, expect } from '@playwright/test';

test.describe('West Bengal & Kolkata Land Acquisition Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByRole('button', { name: /NHAI Officer/i }).click();
    await page.getByRole('button', { name: /Sign In to Dashboard/i }).click();
  });

  test('should display West Bengal state in GIS Tracker dropdown and filter Kolkata parcels', async ({ page }) => {
    // Navigate to GIS & Stage Tracker tab
    const gisTab = page.getByRole('button', { name: /GIS & Stage Tracker/i });
    await expect(gisTab).toBeVisible();
    await gisTab.click();

    // Select State "West Bengal"
    const stateSelect = page.locator('select[title="Filter by State"]');
    await expect(stateSelect).toBeVisible();
    await stateSelect.selectOption('West Bengal');

    // Verify dynamic district dropdown includes Kolkata and West Bengal districts
    const districtSelect = page.locator('select[title="Filter by District"]');
    await expect(districtSelect).toBeVisible();
    const districtOptions = await districtSelect.locator('option').allInnerTexts();
    expect(districtOptions).toContain('Kolkata');
    expect(districtOptions).toContain('Howrah');
    expect(districtOptions).toContain('North 24 Parganas');

    // Select Kolkata district
    await districtSelect.selectOption('Kolkata');

    // Search Kolkata parcel Khasra 304/1A
    const searchInput = page.getByPlaceholder(/Search Khasra No, State, District, Owner/i);
    await searchInput.fill('304/1A');

    // Verify Kolkata parcel card details appear
    await expect(page.getByText('Subhash Chandra Mukhopadhyay')).toBeVisible();
    await expect(page.getByText(/Salt Lake Sector V \/ New Town/i)).toBeVisible();
    await expect(page.getByText(/Kolkata, West Bengal/i)).toBeVisible();
  });

  test('should allow searching Kolkata land parcels in Public Portal', async ({ page }) => {
    // Switch to Public Portal module
    const portalTab = page.getByRole('button', { name: /^Public Portal$/i });
    await expect(portalTab).toBeVisible();
    await portalTab.click();

    // Click sample search for Kolkata Metro
    const kolkataSampleBtn = page.getByRole('button', { name: /Khasra 304\/1A \(Kolkata Metro\)/i });
    await expect(kolkataSampleBtn).toBeVisible();
    await kolkataSampleBtn.click();

    // Verify public result card displays Kolkata Metro info
    await expect(page.getByText('Khasra No. 304/1A')).toBeVisible();
    await expect(page.getByText('Subhash Chandra Mukhopadhyay')).toBeVisible();
    await expect(page.getByText('Salt Lake Sector V / New Town, Kolkata, West Bengal')).toBeVisible();
  });
});
