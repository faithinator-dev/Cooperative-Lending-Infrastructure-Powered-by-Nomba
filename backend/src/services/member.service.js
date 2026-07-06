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

// Get all members
export const getMembers = async (query) => {
  console.log("🔥 USING src/services/member.service.js");

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";
  const sort = query.sort || "-createdAt";

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { bvn: { $regex: search, $options: "i" } },
    ];
  }

  const members = await Member.find(filter)
    .populate("coopId")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Member.countDocuments(filter);

  return {
    members,
    page,
    totalPages: Math.ceil(total / limit),
    total,
  };
};

// Get member by ID
export const getMemberById = async (id) => {
  const member = await Member.findById(id).populate("coopId");

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};

// Update member
export const updateMember = async (id, updateData) => {
  const member = await Member.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};

// Delete member
export const deleteMember = async (id) => {
  const member = await Member.findByIdAndDelete(id);

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};