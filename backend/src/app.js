import express from "express";
import memberRoutes from "./routes/member.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import coopRoutes from "./routes/coop.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import ledgerRoutes from "./routes/ledger.routes.js";

const app = express();

app.use(express.json());

app.use("/api/members", memberRoutes);

app.use("/api/webhooks", webhookRoutes);

app.use("/api/loans", loanRoutes);

app.use("/api/coops", coopRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/ledger", ledgerRoutes);

export default app;