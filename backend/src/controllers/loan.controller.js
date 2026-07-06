import {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
  processRepayment,
} from "../services/loan.service.js";

// Create Loan
export const createLoanController = async (req, res) => {
  try {
    const loan = await createLoan(req.body);

    res.status(201).json({
      success: true,
      message: "Loan created successfully.",
      data: loan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Loans
export const getLoansController = async (req, res) => {
  try {
    const loans = await getLoans();

    res.status(200).json({
      success: true,
      data: loans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Loan By ID
export const getLoanByIdController = async (req, res) => {
  try {
    const loan = await getLoanById(req.params.id);

    res.status(200).json({
      success: true,
      data: loan,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Loan
export const updateLoanController = async (req, res) => {
  try {
    const loan = await updateLoan(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Loan updated successfully.",
      data: loan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Loan
export const deleteLoanController = async (req, res) => {
  try {
    await deleteLoan(req.params.id);

    res.status(200).json({
      success: true,
      message: "Loan deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Repay Loan
export const repayLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { amount } = req.body;

    const updatedLoan = await processRepayment(loanId, amount);

    res.status(200).json({
      success: true,
      message: "Loan repayment processed successfully.",
      data: updatedLoan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};