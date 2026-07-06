import {
  getLedgers,
  getLedgerById,
} from "../services/ledger.service.js";

// Get all ledger entries
export const getAllLedgers = async (req, res) => {
  try {
    const result = await getLedgers(req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get ledger by ID
export const getSingleLedger = async (req, res) => {
  try {
    const ledger = await getLedgerById(req.params.id);

    res.status(200).json({
      success: true,
      data: ledger,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};