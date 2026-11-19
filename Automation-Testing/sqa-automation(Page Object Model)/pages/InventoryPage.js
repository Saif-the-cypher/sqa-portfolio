export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByText('Logout');
    this.title = page.getByText('Products');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}