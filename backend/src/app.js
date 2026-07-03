import express from "express";
import memberRoutes from "./routes/member.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import transferRoutes from "./routes/transfer.routes.js";
import loanRoutes from "./routes/loan.routes.js";


const app = express();

app.use(express.json());

app.use("/api/members", memberRoutes);

app.use("/api/webhooks", webhookRoutes);

app.use("/api/transfers", transferRoutes);

app.use("/api/loans", loanRoutes);

export default app;