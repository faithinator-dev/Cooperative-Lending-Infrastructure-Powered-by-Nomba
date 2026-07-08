import Loan from "../models/Loan.js";

export const updateTransferStatus = async (
  merchantTxRef,
  transferStatus
) => {
  const loan = await Loan.findOne({
    merchantTxRef,
  });

  if (!loan) return null;

  loan.transferStatus = transferStatus;

  if (transferStatus === "SUCCESS") {
    loan.status = "ACTIVE";
  }

  if (transferStatus === "REFUND") {
    loan.status = "PENDING";
  }

  await loan.save();

  return loan;
};