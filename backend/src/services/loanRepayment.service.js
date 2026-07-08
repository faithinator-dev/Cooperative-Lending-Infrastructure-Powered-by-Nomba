import Loan from "../models/Loan.js";
import Ledger from "../models/Ledger.js";

export const processRepayment = async (
  memberId,
  virtualAccountId,
  amount,
  transactionRef
) => {
  // Find active loan
  const loan = await Loan.findOne({
    memberId,
    status: "ACTIVE",
  });

  if (!loan) {
    throw new Error("No active loan found");
  }

  // Reduce balance
  loan.balance -= amount;

  if (loan.balance <= 0) {
    loan.balance = 0;
    loan.status = "PAID";
  }

  await loan.save();

  // Save ledger entry
  await Ledger.create({
    memberId,
    loanId: loan._id,
    virtualAccountId,
    transactionType: "LOAN_REPAYMENT",
    entryType: "CREDIT",
    amount,
    balanceAfter: loan.balance,
    transactionRef,
    narration: "Loan repayment",
    status: "SUCCESS",
  });

  return loan;
};