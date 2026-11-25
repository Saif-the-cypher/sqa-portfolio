import { expect } from '@playwright/test';

export class ShopPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.productCards = page.locator('.card');
    this.addToCart = page.getByRole('button', { name: /add to cart/i });
    this.cartIcon = page.getByTestId('nav-cart');
    this.cartRows = page.locator('table tbody tr');
    this.removeButton = page.locator('.btn-danger');
    this.emptyCartMessage = page.getByText(/cart is empty/i);
  }

async goto() {
  await this.page.goto('/', { waitUntil: 'load', timeout: 60000 });
}

  async search(term) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

async addFirstProductToCart() {
  const firstProduct = this.productCards.first();
  await firstProduct.waitFor({ timeout: 20000 });

  // retry the click until the product page really opens
  await expect(async () => {
    await firstProduct.click();
    await expect(this.page).toHaveURL(/product/, { timeout: 5000 });
  }).toPass({ timeout: 40000 });

  await this.addToCart.waitFor({ timeout: 20000 });
  await this.addToCart.click();
}

  async openCart() {
    await this.cartIcon.click();
  }
}