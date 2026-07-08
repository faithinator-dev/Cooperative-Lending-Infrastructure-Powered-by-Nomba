import {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
  processRepayment,
  disburseLoan,
} from "../services/loan.service.js";

export const createLoanController = async (req, res) => {
  try {
    const loan = await createLoan(req.body);

    res.status(201).json({
      success: true,
      data: loan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

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

export const approveLoan = async (req, res) => {
  try {
    const result = await disburseLoan(req.params.loanId);

    res.status(200).json({
      success: true,
      message: "Loan disbursement initiated.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const repayLoan = async (req, res) => {
  try {
    const loan = await processRepayment(req.params.loanId, req.body.amount);

    res.status(200).json({
      success: true,
      message: "Loan repayment processed.",
      data: loan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
