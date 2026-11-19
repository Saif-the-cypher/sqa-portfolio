
const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');

test('register - parabank using POM', async ({ page }) => {

  // Create Page Object
  const registerPage = new RegisterPage(page);

  // Generate unique username
  const username = 'ahmed_qa_' + Date.now();

  // Test data
  const user = {
    firstName: 'Ahmed',
    lastName: 'Raza',
    address: 'House 12, Street 5, Satellite Town',
    city: 'Rawalpindi',
    state: 'Punjab',
    zipCode: '46000',
    phoneNumber: '03001234567',
    ssn: '123-45-678',
    username: username,
    password: 'Test@1234'
  };

  // Navigate to registration page
  await registerPage.navigate();

  // Fill registration form
  await registerPage.fillRegistrationForm(user);

  // Register user
  await registerPage.register();

  // Verify successful registration
  await expect(registerPage.successMessage).toBeVisible();

  // Logout
  await registerPage.logout();

});
