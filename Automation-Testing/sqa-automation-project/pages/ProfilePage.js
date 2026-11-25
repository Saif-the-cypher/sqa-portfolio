
import { expect } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByTestId('first-name');
    this.phone = page.getByTestId('phone');
    this.postcode = page.getByTestId('postal_code');
    this.state = page.getByTestId('state');
    this.saveButton = page.getByRole('button', { name: 'Update Profile' });
    this.successMessage = page.getByText(/successfully updated/i);
  }

  async goto() {
    await this.page.goto('/account/profile', { waitUntil: 'domcontentloaded' });
    // wait until the form is filled with the user's data
    await expect(this.firstName).toHaveValue('Jane');
  }

  async updateProfile({ phone, postcode, state }) {
    await this.phone.fill(phone);
    await this.postcode.fill(postcode);
    await this.state.fill(state);
    await this.saveButton.click();
  }
}