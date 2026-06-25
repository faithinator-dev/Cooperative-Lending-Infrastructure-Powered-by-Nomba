# Contributing Guide

Welcome to the Co-op Lending Infrastructure project.

This document explains how team members should contribute, collaborate, write code, create pull requests, and maintain project quality throughout the hackathon.

---

## Project Goal

Build a cooperative banking and lending platform powered by Nomba APIs that:

- Creates virtual accounts for members
- Tracks savings deposits
- Manages loan disbursement
- Processes loan repayments
- Maintains a complete ledger system
- Generates regulatory reports
- Handles webhook-driven payment updates

---

## Team Structure

### Backend Engineer 1 (Infrastructure & Nomba Integration)

Responsible for:

- Authentication
- Nomba API integration
- Virtual Account creation
- Webhook handling
- Requery services
- Transfer APIs
- Database schema setup
- Security

Files owned:

- `/backend/src/services/nomba/*`
- `/backend/src/controllers/webhook/*`
- `/backend/src/models/*`

---

### Backend Engineer 2 (Loan Engine & Reporting)

Responsible for:

- Loan creation
- Repayment calculations
- Penalty engine
- Ledger updates
- Aggregation pipelines
- Reports generation
- SMS notifications

Files owned:

- `/backend/src/services/loan/*`
- `/backend/src/services/report/*`

---

### Frontend Engineer 1 (Admin Dashboard)

Responsible for:

- Admin UI
- Member onboarding
- Loan approval screens
- Reports dashboard
- Defaulters page

Files owned:

- `/frontend/src/pages/admin/*`

---

### Frontend Engineer 2 (Member Portal)

Responsible for:

- Member dashboard
- Savings balance page
- Loan repayment history
- Statement downloads

Files owned:

- `/frontend/src/pages/member/*`

---

## Daily Contribution Rules

### 1. Push Code Daily

No contributor should go more than 24 hours without pushing work.

Minimum requirement:

- One commit per day
- Meaningful progress

Examples:

- **Good:** `feat: create member registration endpoint`
- **Bad:** `update`

---

### 2. Create Feature Branches

Never push directly to `main`.

Branch format:

- `feature/member-registration`
- `feature/loan-engine`
- `feature/admin-dashboard`

Bug fixes:

- `fix/webhook-duplication`

---

### 3. Pull Request Requirements

Before merging:

- Code reviewed by at least one teammate
- No console logs
- No unused variables
- No hardcoded secrets
- No failing tests

PR title format:

- `feat: implement virtual account creation`

---

## Coding Standards

### Backend

#### Use Async/Await

Good:

```js
const member = await Member.findById(id);
```

Bad:

```js
Member.findById(id).then(...)
```

#### Use Environment Variables

Never commit:

```js
const secret = "12345";
```

Use:

```js
process.env.NOMBA_SECRET
```

#### Validate Inputs

Always validate:

- Amounts
- Account numbers
- Phone numbers
- BVNs
- IDs

---

### Frontend

#### Component Structure

- `components/`
- `pages/`
- `services/`
- `hooks/`
- `utils/`

---

#### Naming Convention

Components:

- `CreateMember.jsx`
- `LoanTable.jsx`

Hooks:

- `useMembers.js`
- `useLoans.js`

---

### Database Rules

#### Required Indexes

- `transactionRef`
- `accountNumber`
- `memberId`

---

#### Never Update Balance Without Ledger Entry

Wrong:

```js
account.balance += amount;
```

Correct:

1. Create ledger record
2. Update balance
3. Commit transaction

---

### Webhook Rules

Webhooks must be:

- Verified

Always verify Nomba signatures.

- Idempotent

Use:

- `transactionRef`

to prevent duplicates.

- Fast

Respond immediately:

```js
res.status(200).send("OK");
```

Process afterward.

---

### Commit Message Standard

Format:

- `type: description`

Examples:

- `feat: add virtual account creation`
- `fix: resolve duplicate webhook issue`
- `docs: update setup guide`
- `refactor: simplify loan calculation`

---

## API Documentation

Every endpoint must include:

- Route
- Description
- Request Body
- Response

Example:

**Route**

- `POST /api/members`

**Description**

What it does.

**Request Body**

```json
{
  "name": "John Doe"
}
```

**Response**

```json
{
  "success": true
}
```

---

## Testing Checklist

Before marking a task complete:

- Member creation works
- Virtual accounts created
- Savings deposits update balance
- Loan disbursement works
- Loan repayment works
- Underpayment creates arrears
- Overpayment reduces principal
- Duplicate webhook blocked
- Reports generated successfully

---

## Definition of Done

A task is considered complete only if:

- Code is pushed
- PR created
- Reviewed by teammate
- Tested locally
- No errors in console
- Documentation updated

---

## Communication Rules

### Daily standup

Each member answers:

1. What did I complete yesterday?
2. What am I working on today?
3. What is blocking me?

Maximum standup duration: 15 minutes.

---

## Hackathon Priority Order

If time becomes limited:

### Priority 1

- Virtual Accounts
- Savings Ledger
- Loan Disbursement
- Loan Repayment

### Priority 2

- Reports
- Defaulters Dashboard

### Priority 3

- SMS Notifications
- Advanced Analytics

---

## Final Goal

Demonstrate a working cooperative banking system where:

1. Members receive virtual accounts
2. Savings are tracked automatically
3. Loans are disbursed digitally
4. Repayments are reconciled automatically
5. Reports are generated instantly
6. Every transaction is traceable

If a contribution does not help achieve this goal, it should not be prioritized.

