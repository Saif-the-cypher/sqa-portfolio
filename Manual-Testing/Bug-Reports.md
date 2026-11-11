# ParaBank – Professional Bug Reports

**Project:** SQA Portfolio  
**Application:** ParaBank  
**Browser:** Google Chrome  
**Operating System:** Windows 10/11  
**Device:** Desktop  

---

## BUG-001 — Bill Pay accepts a payment larger than the account balance

| Field | Details |
|---|---|
| Bug ID | BUG-001 |
| Title | Bill Pay accepts a payment larger than the available account balance, resulting in a negative balance |
| Severity | Critical |
| Priority | High |
| Environment | ParaBank, Chrome, Windows 10/11, Desktop |
| Related Test Case | TC-BIL-03 |
| Attachments | Screenshot of payment confirmation and negative account balance |

**Steps to Reproduce:**

1. Log in using `ahmedraza_isb`.
2. Navigate to Bill Pay.
3. Fill all payee fields with valid details:
   - Payee: K-Electric
   - City: Karachi
   - State: Sindh
   - ZIP Code: 74000
4. Enter `9999999` in the Amount field.
5. Click Send Payment.

**Expected Result:** Payment should be rejected with an insufficient funds error.

**Actual Result:** Payment succeeds and the account balance becomes negative.

---

## BUG-002 — Transfer Funds accepts a negative amount

| Field | Details |
|---|---|
| Bug ID | BUG-002 |
| Title | Transfer Funds accepts a negative transfer amount |
| Severity | High |
| Priority | High |
| Environment | ParaBank, Chrome, Windows 10/11, Desktop |
| Related Test Case | TC-FRM-03 |
| Attachments | Screenshot of transfer confirmation and account balances |

**Steps to Reproduce:**

1. Log in using `ahmedraza_isb`.
2. Navigate to Transfer Funds.
3. Enter `-500` in the Amount field.
4. Select valid From and To accounts.
5. Click Transfer.

**Expected Result:** Transfer should be rejected with an invalid amount validation message.

**Actual Result:** Transfer is completed despite the negative amount.

---

## BUG-003 — Account pages remain accessible after logout

| Field | Details |
|---|---|
| Bug ID | BUG-003 |
| Title | Account pages remain accessible through the browser Back button after logout |
| Severity | High |
| Priority | High |
| Environment | ParaBank, Chrome, Windows 10/11, Desktop |
| Related Test Case | TC-LGT-02 |
| Attachments | Screenshot of account page displayed after logout |

**Steps to Reproduce:**

1. Log in using `ahmedraza_isb`.
2. Confirm that the Accounts page is displayed.
3. Click Log Out.
4. After reaching the login page, click the browser Back button.

**Expected Result:** User should remain on the login page or receive a session-expired message. Account information should not be displayed.

**Actual Result:** Browser returns to the account page after logout.

---

## BUG-004 — Empty transfer amount displays an internal error

| Field | Details |
|---|---|
| Bug ID | BUG-004 |
| Title | Transfer Funds displays an internal error when the Amount field is empty |
| Severity | Medium |
| Priority | Medium |
| Environment | ParaBank, Chrome, Windows 10/11, Desktop |
| Related Test Case | TC-FRM-04 |
| Attachments | Screenshot showing the exact error message |

**Steps to Reproduce:**

1. Log in using `ahmedraza_isb`.
2. Navigate to Transfer Funds.
3. Leave the Amount field empty.
4. Select valid From and To accounts.
5. Click Transfer.

**Expected Result:** Transfer should be prevented and a required-field validation message should appear.

**Actual Result:** An internal error appears instead of a validation message.

---

## BUG-005 — Registration accepts a one-character password

| Field | Details |
|---|---|
| Bug ID | BUG-005 |
| Title | Registration accepts a one-character password without enforcing password strength |
| Severity | Medium |
| Priority | Medium |
| Environment | ParaBank, Chrome, Windows 10/11, Desktop |
| Related Test Case | TC-REG-08 |
| Attachments | Screenshot of completed registration form and success page |

**Steps to Reproduce:**

1. Open the Registration page.
2. Fill all required fields with valid test details (Name: Usman Tariq, City: Peshawar).
3. Enter `1` in the Password field.
4. Enter `1` in the Confirm Password field.
5. Click Register.

**Expected Result:** Registration should be rejected or an appropriate password-strength requirement should be enforced.

**Actual Result:** Registration completes and the user is logged in despite the one-character password.

---

## BUG-006 — Registration accepts a non-numeric ZIP Code

| Field | Details |
|---|---|
| Bug ID | BUG-006 |
| Title | Registration accepts alphabetic characters in the ZIP Code field |
| Severity | Low |
| Priority | Medium |
| Environment | ParaBank, Chrome, Windows 10/11, Desktop |
| Related Test Case | TC-REG-06 |
| Attachments | Screenshot of registration form and success page |

**Steps to Reproduce:**

1. Open the Registration page.
2. Fill all required fields with valid test details (Name: Bilal Ahmed, City: Rawalpindi).
3. Enter `ABCDE` in the ZIP Code field.
4. Click Register.

**Expected Result:** Registration should be rejected or a validation error should be displayed for the invalid ZIP Code.

**Actual Result:** User is registered with the non-numeric ZIP Code.

---

## BUG-007 — Registration accepts an invalid, too-short SSN value

| Field | Details |
|---|---|
| Bug ID | BUG-007 |
| Title | Registration accepts a three-digit value in the SSN field |
| Severity | Low |
| Priority | Medium |
| Environment | ParaBank, Chrome, Windows 10/11, Desktop |
| Related Test Case | TC-REG-07 |
| Attachments | Screenshot of registration form and post-registration page |

**Steps to Reproduce:**

1. Open the Registration page.
2. Fill all required fields with valid test details (Name: Ayesha Siddiqui).
3. Enter `123` in the SSN field.
4. Click Register.

**Expected Result:** Registration should be rejected or a validation error should be displayed for the invalid SSN format.

**Actual Result:** Registration completes and the user is logged in despite the short SSN value.

---

## BUG-008 — Update Contact Info accepts a non-numeric phone number

| Field | Details |
|---|---|
| Bug ID | BUG-008 |
| Title | Update Contact Info accepts alphabetic characters in the Phone field |
| Severity | Low |
| Priority | Low |
| Environment | ParaBank, Chrome, Windows 10/11, Desktop |
| Related Test Case | TC-PRF-03 |
| Attachments | Screenshot of profile-update confirmation message |

**Steps to Reproduce:**

1. Log in using `ahmedraza_isb`.
2. Navigate to Update Contact Info.
3. Enter `abcd-efgh` in the Phone field.
4. Click Update Profile.

**Expected Result:** Update should be rejected or a validation error should be displayed for the invalid phone number.

**Actual Result:** Profile is updated successfully and a confirmation message appears.

---

## BUG-009 — Update Contact Info accepts a non-numeric ZIP Code

| Field | Details |
|---|---|
| Bug ID | BUG-009 |
| Title | Update Contact Info accepts alphabetic characters in the ZIP Code field |
| Severity | Low |
| Priority | Low |
| Environment | ParaBank, Chrome, Windows 10/11, Desktop |
| Related Test Case | TC-PRF-05 |
| Attachments | Screenshot of profile-update confirmation message |

**Steps to Reproduce:**

1. Log in using `ahmedraza_isb`.
2. Navigate to Update Contact Info.
3. Enter `ABCDE` in the ZIP Code field.
4. Click Update Profile.

**Expected Result:** Update should be rejected or a validation error should be displayed for the invalid ZIP Code.

**Actual Result:** Profile is updated successfully and a confirmation message appears.

---

## Severity and Priority Reference

### Severity

- **Critical:** Major business functionality or security/data integrity is seriously affected.
- **High:** Important functionality is affected.
- **Medium:** Functionality is affected, but a workaround may exist.
- **Low:** Minor impact or less significant validation issue.

### Priority

- **High:** Should be fixed urgently.
- **Medium:** Should be fixed in an upcoming planned release.
- **Low:** Can be scheduled after more important defects.

**Note:** Severity and priority are initial assessments for this practice exercise. Actual evidence should be captured during testing before submitting these reports as confirmed defects.