import Loan from "../models/Loan.js";
import Member from "../models/Member.js";
import Ledger from "../models/Ledger.js";
import { performTransfer } from "./nomba/transfer.service.js";

// ========================
// Helper Functions
// ========================

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

// ========================
// Loan Repayment
// ========================

export const processRepayment = async (loanId, amountPaid) => {
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  if (amountPaid <= 0) {
    throw new Error("Repayment amount must be greater than zero");
  }

  const penalty = calculatePenalty(loan.monthlyDue, amountPaid);

  loan.penalty += penalty;

  loan.balance = loan.balance - amountPaid + penalty;

  if (loan.balance < 0) {
    loan.balance = 0;
  }

  updateLoanStatus(loan);

  await loan.save();

  return loan;
};

// ========================
// Loan Disbursement
// ========================

export const disburseLoan = async (loanId) => {
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  if (loan.status === "ACTIVE") {
    throw new Error("Loan has already been disbursed");
  }

  const member = await Member.findById(loan.memberId);

  if (!member) {
    throw new Error("Member not found");
  }

  if (
    !member.bankDetails?.accountNumber ||
    !member.bankDetails?.accountName ||
    !member.bankDetails?.bankCode
  ) {
    throw new Error("Member bank details are incomplete");
  }

  const merchantTxRef = `LOAN-${Date.now()}`;

  const transfer = await performTransfer({
    amount: loan.principal,
    accountNumber: member.bankDetails.accountNumber,
    accountName: member.bankDetails.accountName,
    bankCode: member.bankDetails.bankCode,
    merchantTxRef,
    senderName: "Faith Cooperative",
    narration: `Loan Disbursement - ${member.name}`,
  });

  loan.transferId = transfer.data.id;
  loan.transferStatus = transfer.data.status;
  loan.merchantTxRef = merchantTxRef;
  loan.disbursedAt = new Date();

  if (transfer.data.status === "SUCCESS") {
    loan.status = "ACTIVE";
  } else {
    loan.status = "PENDING";
  }

  await loan.save();

  await Ledger.create({
    memberId: member._id,
    loanId: loan._id,
    transactionType: "LOAN_DISBURSEMENT",
    entryType: "DEBIT",
    amount: loan.principal,
    balanceAfter: loan.balance,
    transactionRef: merchantTxRef,
    nombaTransactionId: transfer.data.id,
    narration: "Loan disbursed through Nomba",
    status: "SUCCESS",
  });

  return {
    loan,
    transfer,
  };
};

// ========================
// Loan CRUD
// ========================

export const createLoan = async (loanData) => {
  const monthlyDue =
    (loanData.principal * (1 + loanData.interestRate / 100)) /
    loanData.tenorMonths;

  return await Loan.create({
    memberId: loanData.memberId,
    principal: loanData.principal,
    interestRate: loanData.interestRate,
    tenorMonths: loanData.tenorMonths,
    monthlyDue,
    balance: loanData.principal,
    status: "PENDING",
  });
};

export const getLoans = async () => {
  return await Loan.find().populate("memberId");
};

export const getLoanById = async (id) => {
  const loan = await Loan.findById(id).populate("memberId");

  if (!loan) {
    throw new Error("Loan not found");
  }

  return loan;
};

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

export const deleteLoan = async (id) => {
  const loan = await Loan.findByIdAndDelete(id);

  if (!loan) {
    throw new Error("Loan not found");
  }

  return loan;
};