# Co-op Lending Infrastructure Architecture

## Overview

Co-op Lending Infrastructure is a digital cooperative banking platform built on top of Nomba APIs.

The platform enables cooperative societies to:

- Manage member savings
- Create virtual accounts
- Disburse loans
- Track repayments
- Generate reports
- Maintain complete financial audit trails

The system is designed using an event-driven architecture powered by Nomba Webhooks and a double-entry ledger approach.

---

## High Level Architecture

```text
+------------------+
| React Frontend   |
+--------+---------+
         |
         v
+------------------+
| Express API      |
| Node.js Backend  |
+--------+---------+
         |
         v
+------------------+
| MongoDB Atlas    |
+--------+---------+
         |
         v
+------------------+
| Nomba APIs       |
+------------------+
         |
         v
+------------------+
| Webhooks         |
+------------------+
```

---

## System Components

### Frontend Layer

Technology:

- React
- Axios
- React Router
- Tailwind CSS

Responsibilities:

- User Interface
- Admin Dashboard
- Member Portal
- Reports
- Loan Management

---

### Backend Layer

Technology:

- Node.js
- Express
- Mongoose

Responsibilities:

- Business Logic
- API Endpoints
- Authentication
- Loan Engine
- Ledger Management
- Nomba Integration

---

### Database Layer

Technology:

- MongoDB Atlas

Responsibilities:

- Data Persistence
- Transaction Records
- Loan Tracking
- Member Information
- Audit Logs

---

### External Services

#### Nomba

Used for:

- Virtual Accounts
- Transfers
- Transaction Requery
- Webhooks

#### Twilio

Used for:

- SMS Notifications

---

## Core Domain Architecture

```text
Co-op
  ├── Members
  ├── Savings Accounts
  ├── Loan Accounts
  ├── Loans
  ├── Ledgers
  └── Reports
```

---

## Database Architecture

### Members Collection

**members**

```text
members
├── _id
├── name
├── phone
├── bvn
├── coopId
├── bankDetails
└── createdAt
```

Purpose:

Stores cooperative member records.

---

### Virtual Accounts Collection

**virtualaccounts**

```text
virtualaccounts
├── memberId
├── accountNumber
├── accountType
├── nombaAccountRef
├── balance
└── createdAt
```

Account Types:

- SAVE
- LOAN

Every member owns:

- One Savings VA
- One Loan Repayment VA

---

### Loans Collection

**loans**

```text
loans
├── memberId
├── principal
├── interestRate
├── tenorMonths
├── monthlyDue
├── balance
├── status
└── disbursedAt
```

Statuses:

- ACTIVE
- PAID
- ARREARS

---

### Ledgers Collection

**ledgers**

```text
ledgers
├── memberId
├── vaId
├── type
├── amount
├── transactionRef
├── narration
└── createdAt
```

Types:

- CREDIT
- DEBIT
- PENALTY

---

### Webhooks Collection

**webhooks**

```text
webhooks
├── transactionRef
├── payload
├── processed
└── createdAt
```

Purpose:

Prevents duplicate processing.

---

## Request Flow

### Member Creation

```text
Admin
  |
  v
Create Member
  |
  v
Backend
  |
  +---- Create Member Record
  +---- Create Savings VA
  +---- Create Loan VA
  |
  v
MongoDB
```

Result:

Member receives two accounts.

---

### Savings Deposit Flow

```text
Member
  |
  v
Bank Transfer
  |
  v
Nomba
  |
  v
Webhook
  |
  v
Backend
  +---- Verify Signature
  +---- Create Ledger
  +---- Update Balance
  |
  v
MongoDB
```

Result:

Savings balance updates automatically.

---

### Loan Disbursement Flow

```text
Admin
  |
  v
Create Loan
  |
  v
Backend
  +---- Calculate Loan Terms
  +---- Save Loan
  +---- Call Nomba Transfer API
  |
  v
Bank Account
```

Result:

Member receives funds.

---

### Loan Repayment Flow

```text
Member
  |
  v
Transfer to Loan VA
  |
  v
Nomba
  |
  v
Webhook
  |
  v
Backend
  +---- Verify Signature
  +---- Create Ledger
  +---- Update Loan
  +---- Apply Rules
```

---

## Repayment Logic

### Exact Payment

Example:

- Monthly Due = ₦55,000
- Payment = ₦55,000

Result:

- Installment completed.

---

### Underpayment

Example:

- Monthly Due = ₦55,000
- Payment = ₦30,000

Result:

- Remaining = ₦25,000
- Penalty = 5%
- Status = ARREARS

---

### Overpayment

Example:

- Monthly Due = ₦55,000
- Payment = ₦100,000

Result:

- ₦55,000 = Monthly Due
- ₦45,000 = Principal Reduction

Loan balance decreases faster.

---

## Webhook Architecture

Validation

```text
Incoming Webhook
  |
  v
Verify Signature
  |
  v
Accept Request
```

---

## Idempotency

Use `transactionRef` as a unique key.

- If exists: ignore
- If not: process

---

## Ledger Architecture

Principle:

Never modify money without creating a ledger entry.

Rule:

- Ledger First
- Balance Second

Wrong:

- Update balance only

Correct:

- Insert ledger
- Update balance
- Commit transaction

---

## MongoDB Transactions

Used for:

- Loan Repayment
- Savings Deposit
- Balance Updates

Flow:

```js
const session = await mongoose.startSession();

session.startTransaction();

// Create Ledger
// Update Balance
// Update Loan

await session.commitTransaction();
```

---

## Reporting Architecture

Reports are generated using MongoDB Aggregation Pipelines.

### Savings Report

- Total Savings
- Per Member Savings
- Per Co-op Savings

---

### Loan Report

- Total Loans
- Outstanding Loans
- Paid Loans
- Default Rate

---

### Defaulters Report

- Members In Arrears
- Outstanding Amount
- Penalty Amount

---

## Security Architecture

### API Security

Protected Routes:

- JWT Authentication

---

### Webhook Security

Verification:

- HMAC SHA512

Using:

- `NOMBA_WEBHOOK_SECRET`

---

## Environment Variables

- `PORT=`
- `MONGO_URI=`
- `JWT_SECRET=`
- `NOMBA_CLIENT_ID=`
- `NOMBA_CLIENT_SECRET=`
- `NOMBA_ACCOUNT_ID=`
- `NOMBA_WEBHOOK_SECRET=`
- `TWILIO_SID=`
- `TWILIO_TOKEN=`

Never commit these values.

---

## Scaling Strategy

### Current Hackathon Version

- 1 Co-op
- Many Members
- Single Database

### Future Version

- Many Co-ops
- Multi-Tenant
- Separate Reporting
- Role-Based Access

---

## Fault Tolerance

### Missed Webhooks

Solution:

- Scheduled Requery Job
- Every 5 Minutes

Process:

- Fetch Pending Transactions
- Call Nomba Requery
- Update Ledger

---

### Duplicate Webhooks

Solution:

- Unique `transactionRef` index

---

## Monitoring

Track:

- Deposits
- Loan Repayments
- Failed Transfers
- Failed Webhooks
- Arrears Growth

---

## Final Architecture Principle

Every Naira entering or leaving the system must:

1. Be tied to a member.
2. Have a ledger record.
3. Have a transaction reference.
4. Be traceable through reports.
5. Be recoverable through webhook replay or requery.

No money should exist in the system without an audit trail.

