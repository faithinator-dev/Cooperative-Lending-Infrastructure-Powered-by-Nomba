import express from "express";
import {
  addLoan,
  approveLoan,
} from "../controllers/loan.controller.js";

const router = express.Router();

router.post("/", addLoan);

router.post("/disburse/:loanId", approveLoan);

export default router;