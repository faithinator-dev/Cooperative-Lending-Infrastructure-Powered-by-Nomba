# Co-op Lend

<<<<<<< ours
<<<<<<< ours
Cooperative Lending Infrastructure Powered by Nomba

Co-op Lend is a digital cooperative banking and lending platform built on top of Nomba APIs. The platform helps cooperative societies manage member savings, loan disbursement, loan repayments, and financial reporting through a transparent ledger-based system.

---

## Problem

Cooperative societies across Nigeria manage billions of naira in savings and loans, yet many still rely on manual bookkeeping, spreadsheets, paper records, and cash transactions.

These processes often lead to:

- Fraud and fund diversion
- Poor financial visibility
- Loan repayment disputes
- Inaccurate records
- Difficult auditing processes
- Lack of regulatory reporting

---

## Solution

Co-op Lend digitizes cooperative financial operations by providing:

- Member management
- Savings tracking
- Loan management
- Automated repayment processing
- Digital loan disbursement
- Real-time ledgers
- Financial reporting
- Audit trails

Every financial transaction is recorded and traceable.

---

## Key Features

### Member Management

- Register cooperative members
- Manage member profiles
- Track savings and loan history

### Savings Management

- Dedicated savings account per member
- Real-time balance updates
- Transaction history

### Loan Management

- Create and approve loans
- Generate repayment schedules
- Track outstanding balances
- Detect arrears automatically

### Loan Repayment Engine

Handles:

- Exact repayments
- Underpayments
- Overpayments
- Arrears calculation
- Penalty application

### Digital Disbursement

Loans are disbursed through Nomba transfer services.

### Ledger-Based Accounting

Every transaction creates a ledger entry.

Benefits:

- Full transparency
- Fraud prevention
- Auditability
- Easy reconciliation

### Reporting

Generate:

- Total savings reports
- Outstanding loan reports
- Defaulter reports
- Collection rate reports
- Exportable CSV reports

---

## Architecture

### Frontend (React)

``` .
User Interface
Admin Dashboard
Member Portal
Reports
Loan Management
```

### Backend (Node.js + Express)

- Authentication
- Loan Engine
- Ledger Management
- Nomba Integration
- API Endpoints

### Data (MongoDB)

- Data persistence
- Transaction records
- Loan tracking
- Member information
- Audit logs

### Nomba APIs

- Authentication
- Transfers
- Transactions
- Webhooks

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Mongoose
- JWT
- Node-Cron

### Database

- MongoDB Atlas

### Third Party Services

- Nomba Sandbox APIs
- Ngrok
- Twilio SMS

---

## Database Collections

### Members

```js
{
  name,
  phone,
  bvn,
  coopId
}
```

### Accounts

```js
{
  memberId,
  accountType,
  balance
}
```

### Loans

```js
{
  memberId,
  principal,
  interestRate,
  tenorMonths,
  monthlyDue,
  balance,
  status
}
```

### Ledgers

```js
{
  memberId,
  amount,
  type,
  transactionRef,
  narration
}
```

### Webhooks

```js
{
  transactionRef,
  payload,
  processed
}
```

---

## Webhook Processing

Incoming payment notifications are received through Nomba webhooks.

Process:

1. Verify webhook signature
2. Validate transaction
3. Check idempotency
4. Create ledger entry
5. Update account balance
6. Run repayment logic if necessary

Duplicate webhook protection is implemented using unique transaction references.

---

## Security

### Signature Verification

All webhooks are validated before processing.

### Idempotency

Duplicate transactions are prevented through unique transaction references.

### Audit Trail

Every financial operation is logged and traceable.

---

## Team Structure

- **Backend Engineer 1**
  - Nomba Integration
  - Authentication
  - Transfers
  - Webhooks
  - Reconciliation

- **Backend Engineer 2**
  - Database Design
  - Ledger Engine
  - Loan Engine
  - Reporting

- **Frontend Engineer 1**
  - Admin Dashboard
  - Member Management
  - Reports

- **Frontend Engineer 2**
  - Member Portal
  - Transactions
  - Statements

---

## Demo Flow

### Create Member

Create a new cooperative member.

### Deposit Savings

Record a savings deposit and update balances.

### Create Loan

Generate a loan and repayment schedule.

### Disburse Loan

Transfer funds to the member.

### Repay Loan

Process repayments and update balances.

### Generate Reports

Export cooperative financial reports.

---

## Future Improvements

- Multi-cooperative support
- Mobile application
- Automated credit scoring
- AI-powered risk analysis
- Multi-bank integrations
- Regulatory compliance dashboard

---

## Why Co-op Lend?

Co-op Lend transforms traditional cooperative societies into digitally managed financial institutions.

The platform promotes:

- Transparency
- Accountability
- Financial inclusion
- Reduced fraud
- Efficient loan management

---

## Built For

Nomba Hackathon

Powered by Nomba APIs and modern financial infrastructure principles.
=======
=======
>>>>>>> theirs
Cooperative Lending Infrastructure Powered by Nomba.

Co-op Lend is a Node.js and Express backend for cooperative savings, loan disbursement, loan repayment tracking, ledger records, and Nomba webhook reconciliation.

The project is currently backend-focused. The automated test suite covers app import wiring, loan calculations, and webhook idempotency/security checks.

---

## Core Features

- Member and cooperative management
- Virtual account support for savings and loan repayment flows
- Loan creation, approval, disbursement, and repayment logic
- Ledger records for financial activity
- Nomba authentication, transfers, transactions, and webhook handling
- Dashboard and reporting service modules

---

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- Nomba Sandbox APIs
- Node built-in test runner

---

## Project Structure

```text
backend/
  src/
    app.js
    server.js
    config/
    controllers/
    middlewares/
    models/
    routes/
    services/
  tests/
docs/
  API_DOCUMENTATION.md
  ARCHITECTURE.md
  TEAM_RULES.md
```

---

## Environment Setup

Create `backend/.env` from `backend/.env.example` and provide the required values.

Expected variables include:

```env
PORT=5000
MONGODB_URI=
NOMBA_CLIENT_ID=
NOMBA_CLIENT_SECRET=
NOMBA_ACCOUNT_ID=
NOMBA_WEBHOOK_SECRET=
```

Do not commit real credentials.

---

## Install And Run

From the backend directory:

```bash
npm install
npm run start
```

For development:

```bash
npm run dev
```

---

## Tests

The test suite uses Node's built-in test runner.

Run:

```bash
cd backend
npm test
```

The tests live in:

```text
backend/tests/
```

Current test files:

- `app.import.test.js` checks that the Express app can import without route/controller wiring errors.
- `loan.service.test.js` checks loan interest, penalty, status, and repayment balance behavior.
- `webhook.controller.test.js` checks webhook signature protection, ledger idempotency, and retry handling.

---

## Current Test Status

Latest recheck:

```text
Tests: 8
Passing: 8
Failing: 0
```

Passing:

- `src/app.js` imports without route/controller wiring errors.
- `calculateInterest` returns flat interest.
- `calculatePenalty` returns 5 percent of the missed monthly amount.
- `updateLoanStatus` handles paid, arrears, and active loans.
- `createLoan` stores total repayment balance.
- Nomba webhook route uses signature verification middleware.
- Webhook processing avoids duplicate ledger entries for one `transactionRef`.
- Webhook retry logic only treats `PROCESSED` webhooks as already processed.

---

## What Was Fixed

1. `backend/src/controllers/loan.controller.js` was rewritten as a thin controller layer.

   It now exports request handlers such as `createLoanController`, `getLoansController`, `getLoanByIdController`, `updateLoanController`, `deleteLoanController`, `repayLoan`, and `approveLoan`.

   Business logic stays in `backend/src/services/loan.service.js`.

2. Loan balance calculation now stores total repayment.

   Loan creation calculates:

   ```js
   const interest = (principal * interestRate) / 100;
   const totalRepayment = principal + interest;
   const monthlyDue = totalRepayment / tenorMonths;
   ```

   The saved `balance` is `totalRepayment`, not only `principal`.

3. Webhook signature verification is enabled.

   The Nomba webhook route passes `verifyWebhookSignature` before `receiveWebhook`.

4. Webhook ledger idempotency was corrected.

   A single savings webhook transaction creates one ledger entry for one `transactionRef`.

5. Webhook retry behavior was corrected.

   The system only returns "already processed" when the saved webhook status is `PROCESSED`.

6. Verification command:

   ```bash
   npm test
   ```

   Current result: all tests pass.

---

## Important Notes

- Financial updates should be atomic where possible. MongoDB transactions are recommended for webhook processing, ledger creation, account balance updates, and loan balance updates.
- Every money movement should have a traceable ledger record.
- Duplicate webhooks must not create duplicate ledger entries.
- Webhook verification should be enabled before exposing the endpoint outside local development.
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs

