import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';

const newUser = () => ({
  firstName: 'Ahmed',
  lastName: 'Raza',
  dob: '1998-05-14',
  houseNumber : 'CB-89',
  street : '4' ,
  postcode: '46000',
  city: 'Rawalpindi',
  state: 'Punjab',
  country: 'PK',
  phone: '03001234567',
  email: `ahmed.qa.${Date.now()}@example.com`,
  password: 'matlankTVuYchbhi123@21@as21',
});

test.describe('Registration', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('valid registration redirects to login', async ({ page }) => {
    await registerPage.register(newUser());
    await expect(page).toHaveURL(/login/, { timeout: 15000 });
  });

  test('empty form shows required errors', async ({ page }) => {
    await registerPage.submit.click();
    await expect(page.getByText(/required/i).first()).toBeVisible();
  });

  test('weak password is rejected', async ({ page }) => {
    await registerPage.register({ ...newUser(), password: '123' });
    await expect(page).toHaveURL(/register/);
  });
});