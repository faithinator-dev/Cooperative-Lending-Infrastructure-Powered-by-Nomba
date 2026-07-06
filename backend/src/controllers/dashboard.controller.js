import { getDashboardSummary } from "../services/dashboard.service.js";

export const dashboardSummary = async (req, res) => {
  try {
    const data = await getDashboardSummary();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};