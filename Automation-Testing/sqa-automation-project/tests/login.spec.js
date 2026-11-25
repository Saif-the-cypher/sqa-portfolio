import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Authentication', () => {
  let loginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid login', async ({ page }) => {
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    await expect(page).toHaveURL(/account/);
  });

  test('invalid login', async () => {
    await loginPage.login('wrong@test.com', 'wrongpass');
    await expect(loginPage.error).toBeVisible();
  });

  test('empty fields', async () => {
    await loginPage.submit.click();
    await expect(loginPage.page.getByText(/required/i).first()).toBeVisible();
  });
});