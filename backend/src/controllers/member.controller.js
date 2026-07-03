import { createMember } from "../services/member.service.js";

export const addMember = async (req, res) => {
  try {
    const member = await createMember(req.body);

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A member with this phone number already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
