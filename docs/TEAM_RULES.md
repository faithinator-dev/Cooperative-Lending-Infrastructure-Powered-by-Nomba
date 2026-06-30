# Team Rules & Working Agreement

## Co-op Lending Infrastructure Hackathon Project

- Version: 1.0
- Team Size: 4 Members
- Duration: 7 Days

---

## Purpose

These rules exist to ensure:

- Fast development
- High code quality
- Zero duplicated work
- Successful hackathon demo
- Team accountability

Every member agrees to follow these rules from Day 1 until submission.

---

## Team Structure

### Backend Engineer 1 (BE-1)

Responsible for:

- Nomba Authentication
- Virtual Account Creation
- Transfers API
- Webhooks
- Requery Logic
- Database Models

Must never modify frontend code without approval.

---

### Backend Engineer 2 (BE-2)

Responsible for:

- Ledger Engine
- Loan Engine
- Penalty Logic
- Repayment Logic
- Reports API
- SMS Notifications

Must never change BE-1 API contracts without discussion.

---

### Frontend Engineer 1 (FE-1)

Responsible for:

- Admin Dashboard
- Member Registration
- Loan Creation Screens
- Reports UI
- Defaulters Dashboard

Must use API contracts provided by backend.

---

### Frontend Engineer 2 (FE-2)

Responsible for:

- Member Portal
- Account Balances
- Transaction History
- Loan Schedule
- Statement Downloads

Must use shared design system.

---

### Team Lead

Responsible for:

- Project coordination
- Daily standups
- Architecture decisions
- GitHub management
- Demo preparation
- Final submission

The Team Lead has final approval on all merges.

---

## Daily Rules

### Rule 1

Every member must push code every day.

No exceptions.

Minimum:

- 1 meaningful commit daily

---

### Rule 2

No member should end the day with uncommitted code.

Before sleeping:

```bash
git add .
git commit
git push
```

---

### Rule 3

If blocked for more than 30 minutes:

- Ask for help immediately.
- Do not stay stuck for hours.

---

### Rule 4

Every completed feature must be tested.

Never say:

> "It should work."

Say:

> "I tested it and it works."

---

### Rule 5

No direct push to the `main` branch.

Always use a feature branch:

- `feature/feature-name`

Examples:

- `feature/webhook-handler`
- `feature/member-registration`
- `feature/loan-engine`

---

### Rule 6

Every Pull Request must:

- Compile successfully
- Pass tests
- Be reviewed
- No self-merging

---

## Git Branch Rules

- **Main Branch:** `main`
- **Development Branch:** `develop`
- **Feature Branch Examples:**
  - `feature/nomba-auth`
  - `feature/webhooks`
  - `feature/loan-engine`
  - `feature/admin-dashboard`
  - `feature/member-portal`

---

## Commit Message Rules

- **Format:**

  - `type: description`

- **Examples:**

  - `feat: add virtual account creation`
  - `fix: resolve duplicate webhook issue`
  - `docs: update setup guide`
  - `refactor: simplify loan calculation`

---

## Coding Standards

### Backend

**Requirements:**

- Use Express Router
- Use Service Layer
- Use Mongoose Models
- Use Environment Variables

**Never:**

```js
const token = "abcd123";
```

**Use:**

```js
process.env.TOKEN
```

### Frontend

**Requirements:**

- Reusable Components
- Responsive Layout
- Error Handling
- Loading States

**Never:**

- Hardcode API URLs

**Use:**

- `VITE_API_URL`

---

### Database Rules

Every collection must:

- Have timestamps
- Have indexes where needed
- Validate required fields

Example:

```js
{
  timestamps: true
}
```

Indexes:

- `transactionRef`
- `accountNumber`
- `memberId`

---

### Webhook Rules

Webhooks must always:

- Verify signature
- Respond immediately
- Process asynchronously
- Be idempotent

Never trust webhook payloads without validation.

---

### Loan Rules

Loan calculations must:

- Be deterministic
- Be repeatable
- Be auditable

Repayment order:

1. Penalties
2. Interest
3. Principal

Never skip this order.

---

### Demo Rules

- No risky deployments on Demo Day
- Freeze code before presentation
- Only bug fixes allowed
- No new features

---

## Communication Rules

Team communication:

- WhatsApp

Daily standup:

- **Morning:**
  - What was completed yesterday?
  - What will be done today?
  - Any blockers?
- **Maximum:** 15 minutes

---

## Attendance Rules

Every member must:

- Attend standup
- Reply to team messages
- Update progress
- No disappearing

If unavailable:

- Notify team lead early

---

## Quality Rules

Before marking a task complete:

- ✓ Code works
- ✓ Tested locally
- ✓ No console errors
- ✓ Pushed to GitHub
- ✓ Pull Request opened
- ✓ Reviewed

Only then is it considered complete.

---

## Hackathon Success Checklist

Before Submission:

- ✓ Member Registration Works
- ✓ Virtual Accounts Created
- ✓ Webhooks Working
- ✓ Savings Tracking Works
- ✓ Loan Disbursement Works
- ✓ Loan Repayment Works
- ✓ Penalty Logic Works
- ✓ Reports Generated
- ✓ Demo Script Ready
- ✓ Backup Video Recorded

