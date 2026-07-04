import Loan from "../models/Loan.js";
import Member from "../models/Member.js";
import Ledger from "../models/Ledger.js";
import { performTransfer } from "./nomba/transfer.service.js";

export const disburseLoan = async (loanId) => {
  // Find loan
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new Error("Loan not found");
  }

  // Prevent duplicate disbursement
  if (loan.status === "ACTIVE") {
    throw new Error("Loan has already been disbursed");
  }

  // Find member
  const member = await Member.findById(loan.memberId);

  if (!member) {
    throw new Error("Member not found");
  }

  // Validate bank details
  if (
    !member.bankDetails?.accountNumber ||
    !member.bankDetails?.accountName ||
    !member.bankDetails?.bankCode
  ) {
    throw new Error("Member bank details are incomplete");
  }

  const merchantTxRef = `LOAN-${Date.now()}`;

  // Call Nomba
  const transfer = await performTransfer({
    amount: loan.principal,
    accountNumber: member.bankDetails.accountNumber,
    accountName: member.bankDetails.accountName,
    bankCode: member.bankDetails.bankCode,
    merchantTxRef,
    senderName: "Faith Cooperative",
    narration: `Loan Disbursement - ${member.name}`,
  });

  // Save transfer details
  loan.transferId = transfer.data.id;
  loan.transferStatus = transfer.data.status;
  loan.merchantTxRef = merchantTxRef;
  loan.disbursedAt = new Date();

  // Update status based on Nomba response
  if (transfer.data.status === "SUCCESS") {
    loan.status = "ACTIVE";
  } else {
    loan.status = "PENDING";
  }

  await loan.save();

  // Ledger entry
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
