import Member from "../models/Member.js";
import VirtualAccount from "../models/VirtualAccount.js";
import { createVirtualAccount } from "./nomba/virtualAccount.service.js";

export const createMember = async (
  memberData
) => {
  // Save member first

  const member = await Member.create(
    memberData
  );

  // Savings VA

  const savingsVA =
    await createVirtualAccount(
      `${member.name} Savings`,
      `SAVE-${member._id}`
    );

  // Loan VA

  const loanVA =
    await createVirtualAccount(
      `${member.name} Loan`,
      `LOAN-${member._id}`
    );

  // Save savings account

  await VirtualAccount.create({
    memberId: member._id,
    accountType: "SAVE",
    accountNumber:
      savingsVA.data.bankAccountNumber,
    accountName:
      savingsVA.data.bankAccountName,
    bankName:
      savingsVA.data.bankName,
    nombaAccountRef: `SAVE-${member._id}`,
  });

  // Save loan account

  await VirtualAccount.create({
    memberId: member._id,
    accountType: "LOAN",
    accountNumber:
      loanVA.data.bankAccountNumber,
    accountName:
      loanVA.data.bankAccountName,
    bankName:
      loanVA.data.bankName,
    nombaAccountRef: `LOAN-${member._id}`,
  });

  return member;
};