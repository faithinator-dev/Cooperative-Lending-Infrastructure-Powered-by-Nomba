import Member from "../models/Member.js";

export const createMember = async (data) => {
  const member = await Member.create(data);
  return member;
};