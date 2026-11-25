import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ShopPage } from '../pages/ShopPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

export const test = base.extend({
  loginPage:   async ({ page }, use) => { await use(new LoginPage(page)); },
  shopPage:    async ({ page }, use) => { await use(new ShopPage(page)); },
  profilePage: async ({ page }, use) => { await use(new ProfilePage(page)); },

  // already logged in
  loggedInPage: async ({ page, loginPage }, use) => {
    await loginPage.goto();
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    await page.waitForURL(/account/);
    await use(page);
  },
});

export { expect };