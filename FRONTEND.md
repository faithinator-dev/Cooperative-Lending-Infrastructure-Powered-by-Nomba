# Frontend Documentation — Hackathon Dashboard

## Tech Stack
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- React Query (optional)
- React Hook Form
- React Toastify
- Chart.js / Recharts

## Pages & Features

1) Login
- Fields: Email, Password, Remember me
- States: Loading, Error messages
- Backend: POST /api/auth/login

2) Dashboard
- Summary cards: Total Members, Total Savings, Total Active Loans, Total Loan Outstanding, Total Repaid
- Recent Transactions list
- Charts: Savings Growth, Loan Disbursement, Repayments
- Reusable cards for stats

3) Members
- List view (table): Name, Phone, BVN, Savings Account, Loan Account, Actions (View / Edit / Delete)
- Backend: GET /api/members

Add Member
- Form fields: Name, Phone, BVN, Cooperative, Bank Name, Bank Code, Account Number, Account Name
- Backend: POST /api/members
- After create: show Savings Virtual Account and Loan Virtual Account

Member Profile
- Display personal info, balances, VAs, recent transactions, loans

4) Savings
- Savings balance, virtual account details, recent deposits, transaction history
- Deposit instructions with bank, account name, account number

5) Loans
- Table columns: Principal, Interest, Tenor, Monthly Due, Balance, Status, Transfer Status, Created Date
- Actions: Create Loan, Disburse, View

Create Loan
- Fields: Member, Principal, Interest Rate, Tenor
- Backend: POST /api/loans

Loan Details
- Show principal, interest, balance, monthly due, status, merchant ref, transfer id

Disburse Loan
- Backend: POST /api/loans/disburse/:loanId
- Show loading / success / failed states

6) Transactions
- Unified ledger table: Date, Reference, Member, Type, Credit, Debit, Status, Narration
- Filters: Savings, Loan Repayment, Loan Disbursement, Penalty
- Backend: GET /api/transactions

7) Virtual Accounts
- Display member, savings account, loan account, bank, status
- Buttons: Copy account number, copy account name

8) Webhook Logs (Admin)
- Table useful during demo: Reference, Event, Amount, Account Number, Status, Time

9) Settings
- Cooperative details, Admin details, Webhook URL, API status

## Components
- Navbar, Sidebar (responsive), Cards (statistic, loan, member, transaction), Tables (search, pagination, sorting), Modal (delete, approvals, view details), Toast notifications

## API - Expected Endpoints
- POST /api/auth/login
- GET /api/members
- POST /api/members
- GET /api/loans
- POST /api/loans
- POST /api/loans/disburse/:loanId
- GET /api/transactions
- GET /api/virtual-accounts
- POST /api/webhooks (testing only)

## Folder Structure (suggested)
```
src/
  api/            # axios wrappers per resource (auth.js, member.js, loan.js, ...)
  services/       # higher-level service functions
  hooks/          # useMembers(), useLoans(), useTransactions(), useVirtualAccounts()
  components/     # UI components and reusable widgets
  pages/          # route-based pages
  layouts/        # AppLayout, AuthLayout
  context/        # global state (user, theme)
  assets/
  utils/
```

## Hooks & Services
- `useMembers()`, `useLoans()`, `useTransactions()`, `useVirtualAccounts()` — wrappers around React Query or local state
- `src/api/*.js` — `auth.js`, `member.js`, `loan.js`, `transaction.js`, `virtualAccount.js`, `webhook.js` using Axios

## State Management
- Lightweight: Context for `user` and `ui` state
- React Query for server state (members, loans, transactions)

## UI Theme
- Primary: Nomba Purple
- Secondary: White
- Accent: Green, Blue, Orange

## Nice-to-Have Features
- Dark Mode, Export CSV/PDF, Print Loan Receipt, QR Code for Virtual Account, Copy account button, Skeleton loaders, Empty states, Mobile responsiveness

## Development Order (Recommended)
1. Authentication & layout (Login, sidebar, navbar)
2. Dashboard with summary cards and placeholder charts
3. Members module (list, add, profile)
4. Virtual Accounts display
5. Loans module (create, list, details, disburse)
6. Transactions/ledger
7. Settings and webhook logs
8. Polish: responsiveness, loading states, error handling, export/print

## Quick Tasks for You (first 3)
1. Install Tailwind and configure with Vite
2. Scaffold `src/api/auth.js` and `src/context/AuthContext.jsx`
3. Implement `pages/Login.jsx` with React Hook Form and POST to `/api/auth/login`

## Notes for Hackathon
- Prioritize working features for demo (auth, dashboard stats, members list). Keep UI simple and consistent.
- Create mock data endpoints or use a lightweight mock server if backend is not ready.

---
Generated for the frontend lead during the hackathon. Ask if you want scaffolding added now (Tailwind, auth, login page).
