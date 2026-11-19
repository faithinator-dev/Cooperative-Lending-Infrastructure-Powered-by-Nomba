# Co-op Lend team workflow

## Frontend and authentication scope
The public website includes a landing page, feature overview and calls to action. The workspace includes sign-in, registration, forgot-password, reset-password and protected routes for dashboard, members, savings, loans, transactions, reports and settings.

## Required backend authentication contract
The frontend expects these endpoints:
- POST /api/auth/register — { name, email, cooperativeName, password }
- POST /api/auth/login — { email, password }
- GET /api/auth/me — returns the current user
- POST /api/auth/logout — invalidates the session
- POST /api/auth/forgot-password — { email }; return a generic response to avoid account enumeration
- POST /api/auth/reset-password — { token, password }

These endpoints are not currently mounted in backend/src/app.js. Backend owners must implement and test them before authentication works. Use password hashing, one-time reset tokens stored hashed with expiry, rate limiting, secure HttpOnly/SameSite cookies, CSRF protections, server-side authorization and email delivery. Never store session tokens in localStorage or expose secrets in browser code.

Set VITE_API_URL to the backend origin. The backend CORS allowlist must include the exact frontend origin and allow credentials. Cross-site cookie settings need deliberate configuration.

## Six-person GitHub workflow
1. Protect main. Nobody pushes directly to main.
2. Create a branch per task from updated main: feat/area-short-name, fix/area-short-name or docs/topic.
3. One owner per task and clear file ownership. Tell the team which files you are editing before starting.
4. Commit small changes with descriptive messages, e.g. feat(auth): add reset password screen.
5. Push the branch and open a pull request into main. Include purpose, screenshots, test steps, API dependencies and known gaps.
6. Request one reviewer. Backend changes get reviewed by the other backend engineer; frontend changes by the other frontend engineer. The integrator checks cross-stack work.
7. Resolve review comments, update from main, rerun checks, then merge.
8. Delete merged branches. Never commit .env files, credentials, real member data or payment details.

## Suggested task ownership
- Backend engineer 1: authentication, Nomba integration, transfers and webhooks.
- Backend engineer 2: database models, ledger, loan engine and reporting APIs.
- MERN developer 1: frontend shell, public pages, routing and auth UI.
- MERN developer 2: dashboard, members, savings and transactions UI/API integration.
- New contributor: documentation, test cases, accessibility checks and small isolated fixes, paired with a mentor.
- Basic web developer: landing-page content, responsive QA, visual polish and bug reproduction.

Daily routine: pull main, create a task branch, communicate changed files, open a draft PR early, then hand off with summary, test steps, screenshots and blockers.
