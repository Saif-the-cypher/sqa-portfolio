-- =====================================================================
-- Database Testing: SQL practice for QA 
-- Works in MySQL 8.0.16+ 
-- All data is fake practice data.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. SETUP: tables and sample data
-- ---------------------------------------------------------------------

CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(80),
  city VARCHAR(30),
  status VARCHAR(10),
  balance DECIMAL(10,2)
);

INSERT INTO users (id, name, email, city, status, balance) VALUES
(1, 'Ahmed Raza',      'ahmed@example.com',   'Islamabad',  'active',   52000.00),
(2, 'Sana Malik',      'sana@example.com',    'Lahore',     'active',   18500.50),
(3, 'Bilal Ahmed',     'bilal@example.com',   'Rawalpindi', 'inactive', 0.00),
(4, 'Ayesha Siddiqui', 'ayesha@example.com',  'Lahore',     'active',   97000.00),
(5, 'Usman Tariq',     'usman@example.com',   'Peshawar',   'active',   3200.00),
(6, 'Fatima Noor',     'fatima@example.com',  'Karachi',    'active',   74000.25),
(7, 'Hamza Khan',      'hamza@example.com',   'Karachi',    'inactive', 1500.00),
(8, 'Sana Malik',      'sana@example.com',    'Multan',     'active',   4100.00);  -- deliberate duplicate email

CREATE TABLE accounts (
  account_id   INT PRIMARY KEY,
  user_id      INT NOT NULL,
  account_type VARCHAR(20) NOT NULL,
  balance      DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0),
  CONSTRAINT fk_accounts_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
  txn_id     INT PRIMARY KEY,
  account_id INT NOT NULL,
  amount     DECIMAL(10,2) NOT NULL,
  txn_type   VARCHAR(20) NOT NULL,
  CONSTRAINT fk_txn_account FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

INSERT INTO accounts (account_id, user_id, account_type, balance) VALUES
(101, 1, 'savings',  52000.00),
(102, 1, 'checking',  8000.00),
(103, 2, 'savings',  18500.50),
(104, 4, 'savings',  97000.00),
(105, 5, 'checking',  3200.00),
(106, 6, 'savings',  74000.25);

INSERT INTO transactions (txn_id, account_id, amount, txn_type) VALUES
(1, 101,  3500.00, 'bill_payment'),
(2, 101,  5000.00, 'transfer'),
(3, 103,  1200.00, 'bill_payment'),
(4, 104, 20000.00, 'transfer'),
(5, 106,   800.00, 'bill_payment');


-- ---------------------------------------------------------------------
-- 2. SELECT, WHERE, ORDER BY, LIMIT, GROUP BY, HAVING
-- ---------------------------------------------------------------------

-- All users in Karachi
SELECT * FROM users WHERE city = 'Karachi';

-- Users with a balance above 50,000, highest first
SELECT name, balance FROM users WHERE balance > 50000.00 ORDER BY balance DESC;

-- The 3 users with the lowest balance
SELECT * FROM users ORDER BY balance ASC LIMIT 3;

-- Names starting with A, or emails containing "sana"
SELECT * FROM users WHERE name LIKE 'A%' OR email LIKE '%sana%';

-- Cities that have more than one user
SELECT city, COUNT(*) AS total_users
FROM users
GROUP BY city
HAVING COUNT(*) > 1;

-- Total balance of active users
SELECT status, SUM(balance) AS total_balance
FROM users
WHERE status = 'active'
GROUP BY status;

-- QA query: find duplicate emails
SELECT email, COUNT(*) AS times_used
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- INSERT, UPDATE, DELETE (SELECT first, change, SELECT again to verify)
INSERT INTO users (id, name, email, city, status, balance)
VALUES (9, 'Hammad Ali', 'hammad@example.com', 'Islamabad', 'active', 50.00);

SELECT * FROM users WHERE id = 9;
UPDATE users SET balance = 52.00 WHERE id = 9;
SELECT * FROM users WHERE id = 9;
DELETE FROM users WHERE id = 9;
SELECT * FROM users WHERE id = 9;   -- expect 0 rows


-- ---------------------------------------------------------------------
-- 3. JOINs
-- ---------------------------------------------------------------------

-- INNER JOIN: users with their accounts (expect 6 rows)
SELECT u.name, a.account_type, a.balance
FROM users u
INNER JOIN accounts a ON a.user_id = u.id;

-- LEFT JOIN: all users, with or without an account (expect 9 rows incl. id 9 if not deleted)
SELECT u.name, a.account_type, a.balance
FROM users u
LEFT JOIN accounts a ON a.user_id = u.id;

-- Users who have no account (expect Bilal, Hamza, Sana in Multan)
SELECT u.id, u.name
FROM users u
LEFT JOIN accounts a ON a.user_id = u.id
WHERE a.account_id IS NULL;

-- Total balance per user
SELECT u.name, SUM(a.balance) AS total_balance
FROM users u
INNER JOIN accounts a ON a.user_id = u.id
GROUP BY u.name;

-- Transaction count per account, including accounts with zero transactions
SELECT a.account_id, COUNT(t.txn_id) AS txn_count
FROM accounts a
LEFT JOIN transactions t ON t.account_id = a.account_id
GROUP BY a.account_id;


-- ---------------------------------------------------------------------
-- 4.CONSTRAINT TESTS (each statement should FAIL; record the error)
-- ---------------------------------------------------------------------

-- Duplicate primary key
INSERT INTO accounts (account_id, user_id, account_type, balance) VALUES (101, 1, 'savings', 100.00);

-- Foreign key violation: user 99 does not exist
INSERT INTO accounts (account_id, user_id, account_type, balance) VALUES (200, 99, 'savings', 100.00);

-- NOT NULL violation: account_type is required
INSERT INTO accounts (account_id, user_id, account_type, balance) VALUES (201, 1, NULL, 100.00);

-- CHECK violation: negative balance (needs MySQL 8.0.16+)
INSERT INTO accounts (account_id, user_id, account_type, balance) VALUES (202, 1, 'savings', -500.00);

-- Foreign key protects parent rows: user 1 still has accounts
DELETE FROM users WHERE id = 1;


-- ---------------------------------------------------------------------
-- 5. DATABASE VALIDATION after a (simulated) API registration
-- ---------------------------------------------------------------------

-- Simulate the API creating a user and an account
INSERT INTO users (id, name, email, city, status, balance)
VALUES (10, 'Hammad Ali', 'hammad@example.com', 'Islamabad', 'active', 0.00);
INSERT INTO accounts (account_id, user_id, account_type, balance)
VALUES (107, 10, 'savings', 0.00);

-- Check 1: the row exists
SELECT * FROM users WHERE email = 'hammad@example.com';

-- Check 2: exactly one row (expect 1; more than 1 means a duplicate)
SELECT COUNT(*) FROM users WHERE email = 'hammad@example.com';

-- Check 3: stored values match what was sent, and defaults are correct
SELECT name, city, status, balance FROM users WHERE id = 10;

-- Check 4: the related account row was created and linked
SELECT u.name, a.account_id, a.account_type, a.balance
FROM users u
INNER JOIN accounts a ON a.user_id = u.id
WHERE u.email = 'hammad@example.com';

-- Data-integrity check: any account with a negative balance? (expect 0 rows)
SELECT * FROM accounts WHERE balance < 0;
