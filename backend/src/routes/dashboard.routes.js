import express from "express";
import { dashboardSummary } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", dashboardSummary);

export default router;