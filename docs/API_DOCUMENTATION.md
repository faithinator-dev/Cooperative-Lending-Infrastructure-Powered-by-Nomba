# Co-op Lending Infrastructure API Documentation

## Overview

The Co-op Lending Infrastructure is a cooperative banking and lending platform built on top of Nomba APIs.

The system enables:

- Member onboarding
- Automatic virtual account creation
- Savings tracking
- Loan disbursement
- Loan repayment processing
- Ledger management
- Regulatory reporting
- Webhook-driven transaction reconciliation

---

## Base URL

- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-domain.com/api`

---

## Authentication

All protected routes require:

- `Authorization: Bearer <token>`

Example:

```http
Authorization: Bearer eyJhbGci...
```

---

## Response Format

### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## MEMBERS MODULE

### Create Member

Creates a cooperative member and automatically generates:

- Savings Virtual Account
- Loan Repayment Virtual Account

**Endpoint**

- `POST /members`

**Request**

```json
{
  "name": "John Doe",
  "phone": "08012345678",
  "bvn": "12345678901",
  "coopId": "coop123",
  "bankDetails": {
    "accountNumber": "0123456789",
    "bankName": "Access Bank"
  }
}
```

**Response**

```json
{
  "success": true,
  "message": "Member created successfully",
  "data": {
    "memberId": "64fd12ab",
    "savingsVA": "8012345678",
    "loanVA": "8012345679"
  }
}
```

---

### Get Member

**Endpoint**

- `GET /members/:memberId`

**Response**

```json
{
  "success": true,
  "data": {
    "id": "64fd12ab",
    "name": "John Doe",
    "phone": "08012345678"
  }
}
```

---

### Get All Members

**Endpoint**

- `GET /members`

**Response**

```json
{
  "success": true,
  "data": []
}
```

---

## VIRTUAL ACCOUNTS MODULE

### Get Member Accounts

Returns:

- Savings Account
- Loan Account

**Endpoint**

- `GET /virtual-accounts/member/:memberId`

**Response**

```json
{
  "success": true,
  "data": [
    {
      "accountType": "SAVE",
      "accountNumber": "8012345678",
      "balance": 100000
    },
    {
      "accountType": "LOAN",
      "accountNumber": "8012345679",
      "balance": 0
    }
  ]
}
```

---

## SAVINGS MODULE

### Get Savings Balance

**Endpoint**

- `GET /savings/:memberId`

**Response**

```json
{
  "success": true,
  "balance": 100000
}
```

---

### Get Savings Statement

**Endpoint**

- `GET /savings/:memberId/statement`

**Response**

```json
{
  "success": true,
  "transactions": []
}
```

---

## LOANS MODULE

### Create Loan

Creates a new loan for a member.

**Endpoint**

- `POST /loans`

**Request**

```json
{
  "memberId": "64fd12ab",
  "principal": 200000,
  "interestRate": 10,
  "tenorMonths": 4
}
```

**Response**

```json
{
  "success": true,
  "data": {
    "loanId": "loan123",
    "monthlyDue": 55000,
    "status": "ACTIVE"
  }
}
```

---

### Get Loan

**Endpoint**

- `GET /loans/:loanId`

**Response**

```json
{
  "success": true,
  "data": {
    "principal": 200000,
    "balance": 220000,
    "status": "ACTIVE"
  }
}
```

---

### Get Member Loans

**Endpoint**

- `GET /loans/member/:memberId`

**Response**

```json
{
  "success": true,
  "data": []
}
```

---

### Disburse Loan

Uses Nomba Transfers API.

**Endpoint**

- `POST /loans/disburse`

**Request**

```json
{
  "loanId": "loan123"
}
```

**Response**

```json
{
  "success": true,
  "message": "Loan disbursed"
}
```

---

### Repayment Breakdown

Shows repayment schedule.

**Endpoint**

- `GET /loans/:loanId/schedule`

**Response**

```json
{
  "success": true,
  "schedule": []
}
```

---

## LEDGER MODULE

### Get Ledger Entries

**Endpoint**

- `GET /ledgers`

**Query Parameters**

- `memberId`
- `type`
- `startDate`
- `endDate`

**Response**

```json
{
  "success": true,
  "data": []
}
```

---

### Get Member Ledger

**Endpoint**

- `GET /ledgers/member/:memberId`

**Response**

```json
{
  "success": true,
  "data": []
}
```

---

## REPORTS MODULE

### Defaulters Report

Returns all members in arrears.

**Endpoint**

- `GET /reports/defaulters`

**Response**

```json
{
  "success": true,
  "data": []
}
```

---

### CBN Report

Generates cooperative summary.

**Endpoint**

- `GET /reports/cbn`

**Response**

```json
{
  "success": true,
  "data": {
    "totalSavings": 5000000,
    "totalLoans": 3000000,
    "defaultRate": 4.2
  }
}
```

---

### Export Report

**Endpoint**

- `GET /reports/export`

**Output**

```csv
Member Name,Savings,Loan Balance
John Doe,100000,50000
```

---

## WEBHOOK MODULE

### Receive Nomba Webhook

Receives transaction notifications.

**Endpoint**

- `POST /webhooks/nomba`

**Event Flow**

1. Verify signature
2. Return HTTP 200
3. Check duplicate transactionRef
4. Create ledger entry
5. Update balance
6. Execute repayment logic
7. Send notification

**Example Payload**

```json
{
  "transactionRef": "TX123",
  "accountNumber": "8012345678",
  "amount": 100000
}
```

---

## ADMIN DASHBOARD ENDPOINTS

### Dashboard Summary

**Endpoint**

- `GET /dashboard/summary`

**Response**

```json
{
  "members": 120,
  "activeLoans": 54,
  "totalSavings": 12000000,
  "totalLoanBalance": 5400000
}
```

---

## DATABASE COLLECTIONS

### members

```json
{
  "_id": "",
  "name": "",
  "phone": "",
  "bvn": "",
  "coopId": ""
}
```

### virtualaccounts

```json
{
  "_id": "",
  "memberId": "",
  "accountNumber": "",
  "accountType": "SAVE"
}
```

### loans

```json
{
  "_id": "",
  "memberId": "",
  "principal": 200000,
  "balance": 220000,
  "status": "ACTIVE"
}
```

### ledgers

```json
{
  "_id": "",
  "memberId": "",
  "amount": 100000,
  "type": "CREDIT",
  "transactionRef": "TX123"
}
```

---

## Nomba API Integrations

### Virtual Accounts

Used For:

- Savings Account Creation
- Loan Repayment Account Creation

### Transfers

Used For:

- Loan Disbursement

### Transactions

Used For:

- Reconciliation
- Requery Jobs

### Webhooks

Used For:

- Deposit Notifications
- Loan Repayment Processing
- Balance Updates

---

## Error Codes

| Code | Meaning |
|------|---------|
| 00 | Success |
| 01 | Generic Error |
| 02 | Validation Error |
| 05 | Transaction Not Permitted |
| 06 | Do Not Retry |
| 401 | Unauthorized |
| 429 | Rate Limited |

---

## Development Notes

1. Every transaction must create a ledger entry.
2. Never update balances without ledger records.
3. All webhook processing must be idempotent.
4. Use MongoDB transactions for financial operations.
5. Verify Nomba webhook signatures before processing.
6. Store Nomba credentials in environment variables.
7. Use transactionRef as a unique identifier for reconciliation.

