# Backend Implementation Guide

> **Audience:** Backend engineers, frontend/MERN engineers integrating the API, and contributors onboarding to Co-op Lend.
>
> **Important:** This guide separates routes verified in the current Express application from features described in older planning documentation. A route is only available when it is mounted in `backend/src/app.js`. Do not assume an endpoint exists because it appears in a product proposal or an older API document.

## 1. Backend overview

The backend is built with:

- Node.js (ES modules)
- Express 5
- MongoDB with Mongoose
- Axios for Nomba API requests
- dotenv for environment configuration
- Node's built-in test runner

The current request flow is:

```text
HTTP request
  -> Express app (src/app.js)
  -> route (src/routes/*.routes.js)
  -> controller (src/controllers/*.controller.js)
  -> service (src/services/*.service.js)
  -> Mongoose model / Nomba API
  -> JSON response
```

**Keep responsibilities separate:**

- **Routes** define HTTP methods and URL paths. They should not contain business logic.
- **Controllers** read `req.params`, `req.query`, and `req.body`, call services, and send HTTP responses.
- **Services** contain business rules, database operations, and third-party API calls.
- **Models** define MongoDB document structure and validation.
- **Middleware** handles cross-cutting work such as webhook signature verification.

## 2. Repository structure

The backend follows this structure:

```text
backend/
  package.json
  src/
    app.js
    server.js
    config/
      database.js
    controllers/
    middlewares/
    models/
    routes/
    services/
      nomba/
  tests/
docs/
  API_DOCUMENTATION.md
  ARCHITECTURE.md
  TEAM_RULES.md
```

When adding a feature, follow the existing naming pattern. For example, a new payments feature could have a route, controller, service, and model where persistence is required.

## 3. Local setup

### Requirements

Install a current supported Node.js LTS release and make sure you have access to a MongoDB database (local MongoDB or MongoDB Atlas) and the Nomba sandbox credentials needed for the integration you are testing.

### Install dependencies

From the repository root:

```bash
cd backend
npm install
```

### Configure environment variables

Create `backend/.env`. The repository README identifies these expected settings:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/coop_lend
NOMBA_CLIENT_ID=your_sandbox_client_id
NOMBA_CLIENT_SECRET=your_sandbox_client_secret
NOMBA_ACCOUNT_ID=your_sandbox_account_id
NOMBA_WEBHOOK_SECRET=your_webhook_secret
```

Use the actual credentials supplied for your development environment. Never commit `.env`, API secrets, access tokens, BVNs, or real customer information. The database connector accepts `MONGODB_URI` or `MONGO_URI`.

### Start the API

```bash
npm run dev
```

The development script uses Nodemon. To start without Nodemon:

```bash
npm start
```

The server connects to MongoDB before listening. The port is read from `PORT`.

### Run tests

```bash
npm test
```

Run tests before opening a pull request. Add tests for new service logic and important controller or middleware behavior.

## 4. Base URL and request conventions

For local development, the API base URL is:

```text
http://localhost:5000/api
```

All mounted routes below are relative to this base URL.

For JSON requests, send:

```http
Content-Type: application/json
Accept: application/json
```

The current app enables `express.json()`. Use JSON request bodies for the POST and PUT examples below.

### HTTP methods

| Method | Purpose | Typical use |
|---|---|---|
| GET | Read data | List records or fetch one record |
| POST | Create or trigger an operation | Create a member, submit a repayment, initiate a transfer |
| PUT | Replace/update a resource | Update a member, cooperative, or loan |
| PATCH | Partial update | **No PATCH route is currently mounted** |
| DELETE | Delete a resource | Delete a member, cooperative, or loan |

Do not use PATCH in the frontend until a PATCH route is implemented and reviewed.

## 5. Current mounted API endpoints

These endpoints are taken from the route files imported by `backend/src/app.js`.

### Members — `/members`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/members` | Create a member |
| GET | `/members` | List members |
| GET | `/members/:id` | Fetch one member |
| PUT | `/members/:id` | Update a member |
| DELETE | `/members/:id` | Delete a member |

**Create member**

```http
POST /api/members
Content-Type: application/json
```

The controller passes the request body to `createMember(req.body)`. The current Member model includes `name`, `phone`, `bvn`, `memberId`, optional `coopId`, and optional `bankDetails`.

Example body (confirm required business fields with the member service before using this as a production validation contract):

```json
{
  "name": "Example Member",
  "phone": "08000000000",
  "bvn": "00000000000",
  "memberId": "MEM-0001",
  "coopId": "COOPERATIVE_MONGODB_ID",
  "bankDetails": {
    "accountNumber": "0000000000",
    "accountName": "Example Member",
    "bankName": "Example Bank",
    "bankCode": "000"
  }
}
```

**List members**

```http
GET /api/members
GET /api/members?page=1&limit=20
```

The controller forwards query parameters to the member service and returns `members`, `page`, `totalPages`, and `total`. Confirm supported filters and pagination defaults in `src/services/member.service.js`.

**Fetch, update, and delete**

```http
GET    /api/members/MEMBER_ID
PUT    /api/members/MEMBER_ID
DELETE /api/members/MEMBER_ID
```

PUT accepts a JSON body containing the fields to update. The exact accepted fields and validation rules belong to the member service/model.

### Cooperatives — `/coops`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/coops` | Create a cooperative |
| GET | `/coops` | List cooperatives |
| GET | `/coops/:id` | Fetch one cooperative |
| PUT | `/coops/:id` | Update a cooperative |
| DELETE | `/coops/:id` | Delete a cooperative |

Examples:

```http
POST   /api/coops
GET    /api/coops
GET    /api/coops/COOP_ID
PUT    /api/coops/COOP_ID
DELETE /api/coops/COOP_ID
```

POST and PUT accept JSON bodies. The controller passes those bodies to `createCoop` and `updateCoop` respectively. Check `src/models/Coop.js` and `src/services/coop.service.js` for the exact fields and validation rules before building forms.

### Loans — `/loans`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/loans` | Create a loan |
| GET | `/loans` | List loans |
| GET | `/loans/:id` | Fetch one loan |
| PUT | `/loans/:id` | Update a loan |
| DELETE | `/loans/:id` | Delete a loan |
| POST | `/loans/disburse/:loanId` | Initiate loan disbursement |
| POST | `/loans/:loanId/repay` | Process a repayment |

**Create loan**

```http
POST /api/loans
Content-Type: application/json
```

The current Loan model requires `memberId`, `principal`, `interestRate`, `tenorMonths`, `monthlyDue`, and `balance`. Loan status is one of `PENDING`, `ACTIVE`, `PAID`, or `ARREARS`.

Example body:

```json
{
  "memberId": "MEMBER_MONGODB_ID",
  "principal": 200000,
  "interestRate": 10,
  "tenorMonths": 4,
  "monthlyDue": 55000,
  "balance": 220000
}
```

The loan service contains the calculation and business rules. Do not calculate or overwrite financial balances independently in the frontend.

**List and fetch loans**

```http
GET /api/loans
GET /api/loans/LOAN_ID
```

**Update a loan**

```http
PUT /api/loans/LOAN_ID
Content-Type: application/json
```

Send the fields permitted by the loan service. Do not allow a client to change financial status or balances unless the backend business rules explicitly permit it.

**Initiate disbursement**

```http
POST /api/loans/disburse/LOAN_ID
```

The controller passes the loan ID from the URL to `disburseLoan`. The response message currently says the disbursement was initiated; the frontend should not display it as settled until the transfer status is confirmed.

**Repay a loan**

```http
POST /api/loans/LOAN_ID/repay
Content-Type: application/json
```

Body:

```json
{
  "amount": 25000
}
```

The controller passes `req.body.amount` to the loan repayment service. The service is responsible for validating and applying the repayment.

### Transfers — `/transfers`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/transfers/banks` | Fetch the bank list from Nomba |
| POST | `/transfers/lookup` | Resolve a bank account |
| POST | `/transfers/send` | Initiate a bank transfer |

**Fetch banks**

```http
GET /api/transfers/banks
```

**Look up a bank account**

```http
POST /api/transfers/lookup
Content-Type: application/json
```

Body:

```json
{
  "accountNumber": "0000000000",
  "bankCode": "000"
}
```

**Send a transfer**

```http
POST /api/transfers/send
Content-Type: application/json
```

The transfer service currently reads these fields from the request body:

```json
{
  "amount": 1000,
  "accountNumber": "0000000000",
  "accountName": "Example Recipient",
  "bankCode": "000",
  "merchantTxRef": "UNIQUE_REFERENCE_FOR_THIS_TRANSFER",
  "senderName": "Co-op Lend",
  "narration": "Approved cooperative loan"
}
```

This endpoint calls the Nomba sandbox transfer API. Use sandbox credentials and test data during development. Transfers are financial actions: add appropriate server-side authorization, amount validation, idempotency, audit logging, and confirmation/reconciliation before production use.

### Ledger — `/ledger`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/ledger` | List ledger entries |
| GET | `/ledger/:id` | Fetch one ledger entry |

Examples:

```http
GET /api/ledger
GET /api/ledger?memberId=MEMBER_ID
GET /api/ledger/LEDGER_ID
```

The list controller passes `req.query` to `getLedgers`. The exact supported filters and pagination behavior are defined by `src/services/ledger.service.js`.

### Dashboard — `/dashboard`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/dashboard` | Dashboard summary |
| GET | `/dashboard/charts` | Dashboard chart data |

Examples:

```http
GET /api/dashboard
GET /api/dashboard/charts
```

Both endpoints are GET-only. See `src/controllers/dashboard.controller.js` and `src/services/dashboard.service.js` for the response fields.

### Nomba webhook — `/webhooks`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/webhooks/nomba` | Receive a Nomba webhook |

```http
POST /api/webhooks/nomba
```

The route runs `verifyWebhookSignature` before `receiveWebhook`. Do not bypass this middleware. Webhook processing must remain idempotent: repeated delivery of the same transaction reference must not create duplicate ledger entries or apply a payment twice.

Webhook payload shape and signature requirements must follow the configured Nomba webhook contract. Do not invent or assume a payload schema; check the webhook controller and middleware and the current Nomba integration documentation.

## 6. Response and error handling

Controllers currently return JSON with a `success` flag. Common shapes include:

```json
{
  "success": true,
  "data": {}
}
```

```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

Some list endpoints return additional top-level fields such as `members`, `page`, `totalPages`, or `total`. Frontend developers should inspect the response for the endpoint they are integrating rather than assuming every endpoint returns the same shape.

Observed controller status codes include:

- `200` — successful read/update/action
- `201` — successful creation
- `400` — invalid request or business operation rejected
- `404` — requested record not found
- `500` — unexpected server or upstream error

The exact status depends on the controller. Handle both non-2xx HTTP responses and `success: false` responses in the frontend.

## 7. How to add a new backend endpoint

Use this sequence for a new feature.

### Step 1 — Define the contract

Write down:

- URL and HTTP method
- Who is allowed to use it
- Required path parameters, query parameters, and JSON fields
- Validation rules
- Success response and possible errors
- Whether it changes money, account balances, or personal information

Agree on this contract with the frontend developer before implementation.

### Step 2 — Add or update the model

If the feature needs persistent data, add a Mongoose model under `src/models/`. Define required fields, types, indexes, enums, timestamps, and references. Avoid storing secrets or unnecessary sensitive data.

### Step 3 — Implement the service

Add business logic under `src/services/`. Keep database and Nomba API operations out of route files. Validate input on the server even if the frontend also validates it.

### Step 4 — Implement the controller

The controller should:

1. Read input from `req.params`, `req.query`, or `req.body`.
2. Call the service.
3. Return a clear status code and JSON response.
4. Handle expected errors without exposing secrets or internal stack traces.

### Step 5 — Add the route

Create a route file under `src/routes/`, import the controller, and define the method/path. Then mount it in `src/app.js` with an `/api/<resource>` prefix.

### Step 6 — Add tests

Test successful requests, invalid input, missing records, database failures, and any duplicate/retry behavior. Financial flows also need tests for repeated requests and reconciliation.

### Step 7 — Update documentation and open a PR

Update this guide and `docs/API_DOCUMENTATION.md` when the endpoint is ready. Include sample requests/responses and note any environment variables. Push to a feature branch and open a pull request; do not push directly to `main`.

## 8. Frontend integration example

A frontend can call the API with Axios. Keep the base URL in an environment variable rather than hardcoding it in every component.

```js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Example: list members
export async function fetchMembers() {
  const response = await api.get("/members");
  return response.data;
}

// Example: create a member
export async function createMember(payload) {
  const response = await api.post("/members", payload);
  return response.data;
}
```

For a Vite frontend, set:

```env
VITE_API_URL=http://localhost:5000/api
```

Never put Nomba client secrets or webhook secrets in frontend environment variables. Variables prefixed with `VITE_` are exposed to browser code.

## 9. Important implementation gaps to resolve

The following points are visible from the current route wiring and should be addressed before describing the backend as production-ready:

1. **Authentication and authorization:** the current `src/app.js` mounts the resource routes without an authentication/role middleware. The older API document mentions bearer tokens, but that alone does not mean authentication is implemented. Add and test authentication and role-based access before exposing member, loan, ledger, or transfer operations.
2. **Documented but not currently mounted routes:** older API documentation describes virtual-account and savings endpoints, member-specific loan routes, repayment schedules, and reports. These are not mounted in the current `src/app.js` route list. Treat them as planned/unverified until implemented and mounted.
3. **No PATCH routes:** current resource routes use PUT for updates. Do not call PATCH from the frontend.
4. **CORS and security headers:** review production CORS policy, Helmet configuration, rate limiting, and request-size limits. The package includes CORS and Helmet, but the current `app.js` does not configure them.
5. **Financial consistency:** use database transactions where supported for related ledger and balance changes. Enforce unique transaction references and idempotency at the database level where appropriate. Never trust a frontend-calculated balance.
6. **Input validation:** add explicit validation for IDs, amounts, phone numbers, BVNs, pagination, and all external payloads.
7. **Environment template:** maintain a safe `.env.example` with variable names and placeholder values only; never include real secrets.
8. **API documentation accuracy:** keep the route list synchronized with `src/app.js` and the route files. If an endpoint is not implemented, label it as planned rather than presenting it as available.

## 10. Backend contribution checklist

Before marking a backend task complete:

- [ ] Route is mounted in `src/app.js`.
- [ ] Controller and service responsibilities are separated.
- [ ] Input is validated on the server.
- [ ] Success and error responses are documented.
- [ ] Access control is implemented for the endpoint.
- [ ] Financial operations are safe against duplicate/retried requests.
- [ ] Tests cover success and failure cases.
- [ ] No secrets or real customer data are committed.
- [ ] API documentation is updated.
- [ ] Changes are pushed to a feature branch and submitted through a pull request.

---

**Source of truth:** the currently mounted implementation is in `backend/src/app.js`, `backend/src/routes/`, `backend/src/controllers/`, `backend/src/services/`, and `backend/src/models/`. Update this guide whenever those files change.
