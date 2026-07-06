import express from "express";
import {
  dashboardSummary,
  dashboardCharts,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", dashboardSummary);

router.get("/charts", dashboardCharts);

export default router;