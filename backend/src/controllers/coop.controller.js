import {
  createCoop,
  getCoops,
  getCoopById,
  updateCoop,
  deleteCoop,
} from "../services/coop.service.js";

// Create Coop
export const createCoopController = async (req, res) => {
  try {
    const coop = await createCoop(req.body);

    res.status(201).json({
      success: true,
      message: "Cooperative created successfully.",
      data: coop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Coops
export const getCoopsController = async (req, res) => {
  try {
    const coops = await getCoops();

    res.status(200).json({
      success: true,
      data: coops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Coop By ID
export const getCoopByIdController = async (req, res) => {
  try {
    const coop = await getCoopById(req.params.id);

    res.status(200).json({
      success: true,
      data: coop,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Coop
export const updateCoopController = async (req, res) => {
  try {
    const coop = await updateCoop(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Cooperative updated successfully.",
      data: coop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Coop
export const deleteCoopController = async (req, res) => {
  try {
    await deleteCoop(req.params.id);

    res.status(200).json({
      success: true,
      message: "Cooperative deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};