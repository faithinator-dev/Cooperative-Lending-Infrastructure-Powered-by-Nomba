import { createMember } from "../services/member.service.js";

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