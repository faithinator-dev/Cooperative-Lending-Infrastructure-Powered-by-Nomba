import express from "express";
import memberRoutes from "./routes/member.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";


const app = express();

app.use(express.json());

app.use("/api/members", memberRoutes);

app.use("/api/webhooks", webhookRoutes);

export default app;