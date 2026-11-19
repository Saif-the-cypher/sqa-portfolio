
class RegisterPage {

  constructor(page) {
    this.page = page;

    // Registration form locators
    this.firstName = page.locator('[id="customer.firstName"]');
    this.lastName = page.locator('[id="customer.lastName"]');
    this.address = page.locator('[id="customer.address.street"]');
    this.city = page.locator('[id="customer.address.city"]');
    this.state = page.locator('[id="customer.address.state"]');
    this.zipCode = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumber = page.locator('[id="customer.phoneNumber"]');
    this.ssn = page.locator('[id="customer.ssn"]');
    this.username = page.locator('[id="customer.username"]');
    this.password = page.locator('[id="customer.password"]');
    this.confirmPassword = page.locator('#repeatedPassword');

    this.registerButton = page.getByRole('button', { name: 'Register' });

    // Success message
    this.successMessage = page.getByText(
      'Your account was created successfully'
    );

    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  // Navigate to registration page
  async navigate() {
    await this.page.goto(
      'https://parabank.parasoft.com/parabank/register.htm'
    );
  }

  // Fill registration form
  async fillRegistrationForm(user) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.address.fill(user.address);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.zipCode.fill(user.zipCode);
    await this.phoneNumber.fill(user.phoneNumber);
    await this.ssn.fill(user.ssn);
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);
  }

  // Click Register
  async register() {
    await this.registerButton.click();
  }

  // Logout
  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = { RegisterPage };
