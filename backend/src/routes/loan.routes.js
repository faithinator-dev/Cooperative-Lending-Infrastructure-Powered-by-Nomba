import express from "express";
import {addLoan, approveLoan } from "../controllers/loan.controller.js";

const router = express.Router();

router.post("/disburse/:loanId", approveLoan);
router.post("/", addLoan);

export default router; 