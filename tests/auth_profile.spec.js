import { test, expect } from '@playwright/test';

test.describe('BhoomiDrishti — Auth & Profile Feature Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure we hit the Auth screen fresh every time
    await page.goto('http://localhost:5173/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('Auth Feature: Login via Quick Access', async ({ page }) => {
    await expect(page.getByText('National Land Acquisition & Management Platform')).toBeVisible();
    
    // Quick login
    await page.getByRole('button', { name: 'Inspector' }).click();
    await page.getByRole('button', { name: /Sign In to Dashboard/i }).click();

    // Verify successful login by seeing navbar Profile badge or app title
    await expect(page.getByText('BhoomiDrishti').first()).toBeVisible();
  });

  test('Auth Feature: Manual Registration (Sign Up)', async ({ page }) => {
    await page.getByRole('button', { name: /Register/i }).click();

    // Fill form
    await page.getByPlaceholder('Dr. Rajesh Kumar').fill('Priya Patel');
    await page.getByPlaceholder('name@agency.gov.in').fill('priya.p@bhoomidrishti.gov.in');
    await page.getByRole('combobox').selectOption('Admin');
    await page.getByPlaceholder('NHAI HQ, Revenue Dept').fill('Ministry of Rural Development');
    await page.getByPlaceholder('Min. 6 characters').fill('SecurePassword123');
    
    await page.getByRole('button', { name: /Create Account/i }).click();

    // Verify success message
    await expect(page.getByText(/Registration successful/i)).toBeVisible();
  });

  test('Profile Feature: View and Update Profile', async ({ page }) => {
    // 1. Login first
    await page.getByRole('button', { name: 'NHAI Officer' }).click();
    await page.getByRole('button', { name: /Sign In to Dashboard/i }).click();
    
    // Wait for main dashboard
    await expect(page.getByRole('navigation')).toBeVisible();

    // 2. Go to Profile
    await page.getByText('Rajesh Kumar').click(); // The user details block in navbar
    await expect(page.getByRole('heading', { name: /Account Details/i })).toBeVisible();

    // 3. Edit Profile
    // Change name (input id is prof-name)
    await page.locator('#prof-name').fill('Rajesh Kumar (Updated)');
    await page.getByRole('button', { name: /Save Profile/i }).click();

    // Verify saved toast
    await expect(page.getByText(/Profile updated successfully/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Rajesh Kumar (Updated)' })).toBeVisible();
  });
});
