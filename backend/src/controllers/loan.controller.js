import {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
  disburseLoan,
  processRepayment,
} from "../services/loan.service.js";

export const createLoanController = async (req, res) => {
  try {
    const loan = await createLoan(req.body);
    res.status(201).json({ success: true, data: loan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getLoansController = async (req, res) => {
  try {
    const loans = await getLoans();
    res.json({ success: true, data: loans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getLoanByIdController = async (req, res) => {
  try {
    const loan = await getLoanById(req.params.id);
    res.json({ success: true, data: loan });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateLoanController = async (req, res) => {
  try {
    const loan = await updateLoan(req.params.id, req.body);
    res.json({ success: true, data: loan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteLoanController = async (req, res) => {
  try {
    await deleteLoan(req.params.id);
    res.json({ success: true, message: "Loan deleted successfully" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const approveLoan = async (req, res) => {
  try {
    const result = await disburseLoan(req.params.loanId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const repayLoan = async (req, res) => {
  try {
    const loan = await processRepayment(
      req.params.loanId,
      req.body.amount
    );
    res.json({ success: true, data: loan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};