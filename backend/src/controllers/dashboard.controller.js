import { getDashboardSummary } from "../services/dashboard.service.js";
import { getDashboardCharts } from "../services/dashboard.analytics.service.js";

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

export const dashboardCharts = async (req, res) => {
  try {
    const data = await getDashboardCharts();

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