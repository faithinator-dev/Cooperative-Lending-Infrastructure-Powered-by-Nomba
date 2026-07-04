import { processRepayment } from "../services/loan.service.js";

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