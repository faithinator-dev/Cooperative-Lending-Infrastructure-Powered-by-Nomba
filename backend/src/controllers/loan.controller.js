import { createLoan, disburseLoan } from "../services/loan.service.js";

export const addLoan = async (req, res) => {
  try {
    const loan = await createLoan(req.body);

    res.status(201).json({
      success: true,
      data: loan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveLoan = async (req, res) => {
  try {
    const loan = await disburseLoan(req.params.loanId);

    res.status(200).json({
      success: true,
      message: "Loan disbursed successfully",
      data: loan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};