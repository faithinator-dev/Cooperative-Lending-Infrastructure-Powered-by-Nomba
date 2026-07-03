import Loan from "../models/Loan.js";

export const createLoan = async (loanData) => {
  const monthlyDue =
    (loanData.principal * (1 + loanData.interestRate / 100)) /
    loanData.tenorMonths;

  const loan = await Loan.create({
    memberId: loanData.memberId,
    principal: loanData.principal,
    interestRate: loanData.interestRate,
    tenorMonths: loanData.tenorMonths,
    monthlyDue,
    balance: loanData.principal,
    status: "ACTIVE",
  });

  return loan;
};

export const disburseLoan = async (loanId) => {
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  return loan;
};