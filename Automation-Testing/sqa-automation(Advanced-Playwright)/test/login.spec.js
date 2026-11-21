import { test, expect } from '../fixtures/base.js'; // importing from fixtures (Advanced Playwright)
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test('valid login and logout', async ({ loginPage , inventoryPage ,page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toBeVisible();

  await inventoryPage.logout();
  await expect(loginPage.loginButton).toBeVisible();
});

test('locked out user sees error', async ({ loginPage ,page }) => {
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.errorMessage).toContainText('locked out');
});

test('wrong password shows error', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong_pass');
  await expect(loginPage.errorMessage).toBeVisible();
});