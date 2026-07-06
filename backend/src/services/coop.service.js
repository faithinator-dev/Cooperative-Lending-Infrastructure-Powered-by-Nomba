import Coop from "../models/Coop.js";

// Create Coop
export const createCoop = async (coopData) => {
  return await Coop.create(coopData);
};

// Get All Coops
export const getCoops = async () => {
  return await Coop.find();
};

// Get Coop By ID
export const getCoopById = async (id) => {
  const coop = await Coop.findById(id);

  if (!coop) {
    throw new Error("Cooperative not found");
  }

  return coop;
};

// Update Coop
export const updateCoop = async (id, updateData) => {
  const coop = await Coop.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!coop) {
    throw new Error("Cooperative not found");
  }

  return coop;
};

// Delete Coop
export const deleteCoop = async (id) => {
  const coop = await Coop.findByIdAndDelete(id);

  if (!coop) {
    throw new Error("Cooperative not found");
  }

  return coop;
};