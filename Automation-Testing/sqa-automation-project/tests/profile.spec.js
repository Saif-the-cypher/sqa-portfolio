import { test, expect } from '../fixtures/base.js';

const data = { phone: '03211234567', postcode: '46000', state: 'Punjab' };


test.describe('Profile', () => {
  test.beforeEach(async ({ loggedInPage, profilePage }) => {
    await profilePage.goto();
  });


test('update profile', async ({ profilePage }) => {
  await profilePage.updateProfile(data);
  await expect(profilePage.successMessage).toBeVisible();
});

test('updated phone persists after reload', async ({ page, profilePage }) => {
  await profilePage.updateProfile({ ...data, phone: '03451234567' });
  await expect(profilePage.successMessage).toBeVisible();
  await page.reload();
  await expect(profilePage.phone).toHaveValue('03451234567');
});



});

