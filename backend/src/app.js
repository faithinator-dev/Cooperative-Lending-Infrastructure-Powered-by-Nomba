import express from "express";

import memberRoutes from "./routes/member.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import transferRoutes from "./routes/transfer.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import coopRoutes from "./routes/coop.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import ledgerRoutes from "./routes/ledger.routes.js";

const app = express();

app.use(express.json());

// Members
app.use("/api/members", memberRoutes);

// Webhooks
app.use("/api/webhooks", webhookRoutes);

// Transfers
app.use("/api/transfers", transferRoutes);

// Loans
app.use("/api/loans", loanRoutes);

// Cooperatives
app.use("/api/coops", coopRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Ledger
app.use("/api/ledger", ledgerRoutes);

export default app;