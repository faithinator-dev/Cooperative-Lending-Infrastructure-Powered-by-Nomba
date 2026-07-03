import {
  fetchBanks,
  lookupBankAccount,
  performTransfer,
} from "../services/nomba/transfer.service.js";

export const getBanks = async (req, res) => {
  try {
    const result = await fetchBanks();

    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const lookupAccount = async (req, res) => {
  try {
    const result = await lookupBankAccount(req.body);

    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendMoney = async (req, res) => {
  try {
    const result = await performTransfer(req.body);

    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};