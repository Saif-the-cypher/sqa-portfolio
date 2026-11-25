import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/ShopPage.js';

test.describe('Shop', () => {
  let shop;

  test.beforeEach(async ({ page }) => {
    shop = new ShopPage(page);
    await shop.goto();
  });

  test('search returns matching products', async () => {
    await shop.search('hammer');
    await expect(shop.productCards.first()).toBeVisible();
  });

  test('add item to cart', async ({ page }) => {
    await shop.addFirstProductToCart();
    await shop.openCart();
    await expect(page).toHaveURL(/checkout/, { timeout: 15000 });
    await expect(shop.cartRows.first()).toBeVisible();
  });

  test('remove item from cart', async ({ page }) => {
    await shop.addFirstProductToCart();
    await shop.openCart();
    await expect(page).toHaveURL(/checkout/, { timeout: 15000 });
    await expect(shop.cartRows).toHaveCount(1);

    await shop.removeButton.first().click();

    await expect(shop.emptyCartMessage).toBeVisible();
  });
});