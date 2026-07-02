const Member = require("../models/Member");
const VirtualAccount = require("../models/VirtualAccount");

const createMember = async (memberData) => {
  // Check if a member with the same memberId already exists
 const existingMember = await Member.findOne({
  bvn: memberData.bvn,
});

if (existingMember) {
  throw new Error("Member with this BVN already exists");
}

  // Create and save the member
  const member = await Member.create(memberData);

  return member;
};

const getMembers = async () => {
  return await Member.find().populate("coop");
};

const getMemberById = async (id) => {
  const member = await Member.findById(id).populate("coop");

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};

module.exports = {
  createMember,
  getMembers,
  getMemberById,
};