import Loan from "../models/Loan.js";

// Calculate flat interest
export const calculateInterest = (principal, interestRate) => {
  return (principal * interestRate) / 100;
};

// Calculate penalty for underpayment
export const calculatePenalty = (monthlyDue, amountPaid) => {
  if (amountPaid >= monthlyDue) {
    return 0;
  }

  const missedAmount = monthlyDue - amountPaid;
  return missedAmount * 0.05;
};

// Update loan status
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

// Process loan repayment
export const processRepayment = async (loanId, amountPaid) => {
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  if (amountPaid <= 0) {
    throw new Error("Repayment amount must be greater than zero");
  }

  // Calculate penalty
  const penalty = calculatePenalty(loan.monthlyDue, amountPaid);

  // Add penalty
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

// Create a new loan
export const createLoan = async (loanData) => {
  const loan = await Loan.create(loanData);
  return loan;
};

// Get all loans
export const getLoans = async () => {
  return await Loan.find().populate("memberId");
};

// Get a single loan
export const getLoanById = async (id) => {
  const loan = await Loan.findById(id).populate("memberId");

  if (!loan) {
    throw new Error("Loan not found");
  }

  return loan;
};

// Update a loan
export const updateLoan = async (id, updateData) => {
  const loan = await Loan.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!loan) {
    throw new Error("Loan not found");
  }

  return loan;
};

// Delete a loan
export const deleteLoan = async (id) => {
  const loan = await Loan.findByIdAndDelete(id);

  if (!loan) {
    throw new Error("Loan not found");
  }

  return loan;
};