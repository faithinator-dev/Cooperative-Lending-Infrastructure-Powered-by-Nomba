import Loan from "../models/Loan.js";

export const calculateInterest = (principal, interestRate) => {
  return (principal * interestRate) / 100;
};

export const calculatePenalty = (monthlyDue, amountPaid) => {
  if (amountPaid >= monthlyDue) {
    return 0;
  }

  const missedAmount = monthlyDue - amountPaid;

  return missedAmount * 0.05;
};

export const updateLoanStatus = (loan) => {
  if (loan.balance <= 0) {
    loan.status = "PAID";
  } else if (loan.penalty > 0) {
    loan.status = "ARREARS";
  } else {
    loan.status = "ACTIVE";
  }

  return loan.status;
};

export const processRepayment = async (loanId, amountPaid) => {
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  // Calculate penalty (if any)
  const penalty = calculatePenalty(loan.monthlyDue, amountPaid);

  loan.penalty += penalty;

  // Update balance
  loan.balance = loan.balance - amountPaid + penalty;

  // Prevent negative balance
  if (loan.balance < 0) {
    loan.balance = 0;
  }

  // Update status
  updateLoanStatus(loan);

  await loan.save();

  return loan;
};

if (!loan) {
  throw new Error("Loan not found");
}

if (amountPaid <= 0) {
  throw new Error("Repayment amount must be greater than zero");
}