import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../services/member.service.js";

export const addMember = async (req, res) => {
  try {
    const member = await createMember(req.body);

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all members
export const getAllMembers = async (req, res) => {
  try {
    const result = await getMembers(req.query);

    console.log("RESULT:", result);

    return res.status(200).json({
      success: true,
      members: result.members,
      page: result.page,
      totalPages: result.totalPages,
      total: result.total,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get member by ID
export const getSingleMember = async (req, res) => {
  try {
    const member = await getMemberById(req.params.id);

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update member
export const editMember = async (req, res) => {
  try {
    const member = await updateMember(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Member updated successfully.",
      data: member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete member
export const removeMember = async (req, res) => {
  try {
    await deleteMember(req.params.id);

    res.status(200).json({
      success: true,
      message: "Member deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};