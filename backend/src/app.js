import express from "express";
import cors from "cors";
import helmet from "helmet";

import memberRoutes from "./routes/member.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import transferRoutes from "./routes/transfer.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import coopRoutes from "./routes/coop.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import ledgerRoutes from "./routes/ledger.routes.js";

const app = express();

// Only allow the configured frontend origin(s) and local Vite development.
const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header include server-to-server calls and webhooks.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "co-op-lend-api",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

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
