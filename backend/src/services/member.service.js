import Member from "../models/Member.js";

export const createMember = async (memberData) => {
  const existingMember = await Member.findOne({
    bvn: memberData.bvn,
  });

  if (existingMember) {
    throw new Error("Member with this BVN already exists");
  }

  const member = await Member.create(memberData);

  return member;
};

export const getMembers = async () => {
  return await Member.find().populate("coop");
};

export const getMemberById = async (id) => {
  const member = await Member.findById(id).populate("coop");

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};