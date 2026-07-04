import express from "express";
import { repayLoan } from "../controllers/loan.controller.js";

const router = express.Router();

router.post("/:loanId/repay", repayLoan);

export default router;