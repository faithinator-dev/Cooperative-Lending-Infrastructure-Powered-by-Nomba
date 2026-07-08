# Cooperative Lending Infrastructure Powered by Nomba

Backend API for managing cooperative societies, member savings accounts, loan disbursement, repayment tracking, and ledger entries using Nomba integrations.

## Current Scope

This repository currently contains:

- A Node.js/Express backend (`/backend`)
- MongoDB models and services
- Nomba integration services (auth, virtual accounts, transfers, transaction requery)
- API and architecture docs under `/docs`

It does **not** currently contain a frontend application in this repo.

## Core Capabilities

- Cooperative (co-op) CRUD management
- Member onboarding with automatic creation of:
  - Savings virtual account
  - Loan repayment virtual account
- Loan lifecycle:
  - Create loan
  - Disburse loan via Nomba transfer
  - Repay loan and apply arrears penalty logic
- Ledger recording for financial events
- Webhook ingestion for inbound transactions with duplicate protection
- Dashboard summary and chart endpoints

## Tech Stack

- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- Axios (external API calls)
- dotenv
- nodemon (development)

## Repository Structure

```text
.
├── README.md
├── docs
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   ├── TEAM_RULES.md
│   └── vitalInfo.txt
└── backend
    ├── package.json
    ├── .env.example
    └── src
        ├── app.js
        ├── server.js
        ├── config
        ├── controllers
        ├── middlewares
        ├── models
        ├── routes
        └── services
```

## Getting Started

### 1) Prerequisites

- Node.js 18+
- npm
- MongoDB (local or hosted)
- Nomba sandbox credentials

### 2) Install dependencies

```bash
cd /home/runner/work/Cooperative-Lending-Infrastructure-Powered-by-Nomba/Cooperative-Lending-Infrastructure-Powered-by-Nomba/backend
npm install
```

### 3) Configure environment variables

Copy `/backend/.env.example` to `/backend/.env` and set real values.

Required values:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `NOMBA_BASE_URL`
- `NOMBA_ACCOUNT_ID`
- `NOMBA_SUB_ACCOUNT_ID`
- `NOMBA_CLIENT_ID`
- `NOMBA_CLIENT_SECRET`
- `NOMBA_WEBHOOK_SECRET`
- `TWILIO_SID`

### 4) Run the API

```bash
npm run dev
```

or

```bash
npm start
```

## API Base Path

All routes are mounted under `/api`.

### Route Groups

- `/api/coops` - cooperative CRUD
- `/api/members` - member CRUD and onboarding
- `/api/loans` - loan CRUD, disbursement, repayment
- `/api/transfers` - transfer utilities (banks, account lookup, send)
- `/api/ledger` - ledger listing and detail
- `/api/dashboard` - analytics endpoints
- `/api/webhooks/nomba` - Nomba webhook receiver

For endpoint-level request/response examples, see:

- `/home/runner/work/Cooperative-Lending-Infrastructure-Powered-by-Nomba/Cooperative-Lending-Infrastructure-Powered-by-Nomba/docs/API_DOCUMENTATION.md`

## Data Models

Primary MongoDB models:

- `Coop`
- `Member`
- `VirtualAccount`
- `Loan`
- `Ledger`
- `Webhook`

These are defined in:

- `/home/runner/work/Cooperative-Lending-Infrastructure-Powered-by-Nomba/Cooperative-Lending-Infrastructure-Powered-by-Nomba/backend/src/models`

## Implementation Notes

- Loan disbursement writes a ledger entry after transfer initiation.
- Loan repayment logic supports underpayment penalty calculation.
- Webhook processing stores incoming events and avoids duplicate processing by `transactionRef`.
- `verifyWebhookSignature` middleware exists but is currently commented out in route wiring.

## Additional Documentation

- Architecture details: `/home/runner/work/Cooperative-Lending-Infrastructure-Powered-by-Nomba/Cooperative-Lending-Infrastructure-Powered-by-Nomba/docs/ARCHITECTURE.md`
- API details: `/home/runner/work/Cooperative-Lending-Infrastructure-Powered-by-Nomba/Cooperative-Lending-Infrastructure-Powered-by-Nomba/docs/API_DOCUMENTATION.md`
- Contribution rules: `/home/runner/work/Cooperative-Lending-Infrastructure-Powered-by-Nomba/Cooperative-Lending-Infrastructure-Powered-by-Nomba/backend/CONTRIBUTING.md`

---

Built for the Nomba hackathon project context.
