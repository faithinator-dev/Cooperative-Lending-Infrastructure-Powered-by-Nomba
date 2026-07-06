import express from "express";
import {
  createLoanController,
  getLoansController,
  getLoanByIdController,
  updateLoanController,
  deleteLoanController,
  repayLoan,
} from "../controllers/loan.controller.js";

const router = express.Router();

// Loan CRUD
router.post("/", createLoanController);
router.get("/", getLoansController);
router.get("/:id", getLoanByIdController);
router.put("/:id", updateLoanController);
router.delete("/:id", deleteLoanController);

// Loan Repayment
router.post("/:loanId/repay", repayLoan);

export default router;