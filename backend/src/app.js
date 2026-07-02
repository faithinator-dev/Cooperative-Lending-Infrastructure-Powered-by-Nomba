import express from "express";
import memberRoutes from "./routes/member.routes.js";

const app = express();

app.use(express.json());

app.use("/api/members", memberRoutes);

export default app;