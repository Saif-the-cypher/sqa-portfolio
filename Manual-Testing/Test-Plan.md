# Test Plan: ParaBank Web Application

| | |
|---|---|
| **Project** | ParaBank Manual Testing Mini Project |
| **Prepared by** | [MUHAMMAD SAIFULLAH] |
| **Date** | [13 OCTOBER 2026] |
| **Application URL** | https://parabank.parasoft.com/parabank/index.htm |

## 1. Objective
To verify the core functionality of ParaBank's account management features, including registration, authentication, profile management, and banking transactions, and to confirm the application behaves as expected across its key user workflows.

## 2. Scope

**In scope**
- User Registration
- Login / Logout
- Forgot Password (username recovery)
- Profile Management (Update Contact Info)
- Forms: Transfer Funds and Bill Pay
- Transaction Search (Find Transactions)
- Site Navigation

**Out of scope**
- Performance and load testing
- Security penetration testing
- Automation testing (covered later in the roadmap)
- Payment gateway and third-party integrations

## 3. Test Scenarios

| # | Scenario | Test case IDs |
|---|---|---|
| 1 | Verify user registration functionality | TC-REG-01 to 08 |
| 2 | Verify login functionality | TC-LOG-01 to 08 |
| 3 | Verify logout functionality | TC-LGT-01 to 03 |
| 4 | Verify forgot password (username recovery) functionality | TC-FPW-01 to 04 |
| 5 | Verify update profile functionality | TC-PRF-01 to 05 |
| 6 | Verify funds transfer functionality | TC-FRM-01 to 05 |
| 7 | Verify bill pay form functionality | TC-BIL-01 to 08 |
| 8 | Verify transaction search functionality | TC-SRC-01 to 08 |
| 9 | Verify navigation across the site | TC-NAV-01 to 08 |

Total planned test cases: 57 (see `Test-Cases.xlsx`).

## 4. Test Environment
- **Browser(s):** Chrome (latest), Firefox (latest)
- **Operating system:** Windows 10/11
- **Device:** Desktop
- **Test type:** Manual, functional, black-box testing

## 5. Test Approach
Manual black-box testing based on observed application behavior. No formal requirements document exists for this public demo application, so test scenarios and test cases are derived from expected standard banking-application behavior and common QA techniques: equivalence partitioning, boundary value analysis, and error guessing.

Test data uses Pakistani names, cities, phone formats, and CNIC-style numbers where the application's fields allow it.

## 6. Entry Criteria
- The ParaBank application is accessible and stable
- Test scenarios and test cases are documented and reviewed

## 7. Exit Criteria
- All planned test cases have been executed
- All identified bugs have been logged with severity and priority
- No open Critical-severity bugs remain undocumented

## 8. Risks and Assumptions
- As a shared public demo environment, existing data (other testers' accounts and transactions) may be inconsistent, which could affect Search and Navigation results.
- No formal requirements document is available, so expected behavior (for example password rules and field formats) is assumed from standard banking conventions and should be confirmed with the Product Owner.
- The application may reset or behave differently across sessions because it is a public sandbox.
