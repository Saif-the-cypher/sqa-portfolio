import { test, expect } from '@playwright/test';

test('register - parabank', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/register.htm');

  await page.locator('[id="customer.firstName"]').fill('Ahmed');
  await page.locator('[id="customer.lastName"]').fill('Raza');
  await page.locator('[id="customer.address.street"]').fill('House 12, Street 5, Satellite Town');
  await page.locator('[id="customer.address.city"]').fill('Rawalpindi');
  await page.locator('[id="customer.address.state"]').fill('Punjab');
  await page.locator('[id="customer.address.zipCode"]').fill('46000');
  await page.locator('[id="customer.phoneNumber"]').fill('03001234567');
  await page.locator('[id="customer.ssn"]').fill('123-45-678');
  await page.locator('[id="customer.username"]').fill('ahmed_qa_' + Date.now());
  await page.locator('[id="customer.password"]').fill('Test@1234');
  await page.locator('#repeatedPassword').fill('Test@1234');

  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('Your account was created successfully')).toBeVisible();

  await page.getByRole('link', { name: 'Log Out' }).click();
});