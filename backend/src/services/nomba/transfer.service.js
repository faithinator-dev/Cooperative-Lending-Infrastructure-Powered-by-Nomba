import axios from "axios";
import { getAccessToken } from "./auth.service.js";

const BASE_URL = "https://sandbox.nomba.com";

/**
 * Fetch all Nigerian banks
 */
export const fetchBanks = async () => {
  try {
    const auth = await getAccessToken();
    const token = auth.data.access_token;

    const response = await axios.get(`${BASE_URL}/v1/transfers/bank`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accountId: process.env.NOMBA_ACCOUNT_ID,
      },
    });

    return response.data;
  } catch (error) {
    console.error("========== FETCH BANKS ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);

    throw new Error(
      error.response?.data?.description || "Unable to fetch bank list",
    );
  }
};

/**
 * Lookup Bank Account
 */
export const lookupBankAccount = async ({ accountNumber, bankCode }) => {
  try {
    const auth = await getAccessToken();
    const token = auth.data.access_token;

    const response = await axios.post(
      `${BASE_URL}/v1/transfers/bank/lookup`,
      {
        accountNumber,
        bankCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accountId: process.env.NOMBA_ACCOUNT_ID,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Lookup Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Perform Bank Transfer
 */
export const performTransfer = async ({
  amount,
  accountNumber,
  accountName,
  bankCode,
  merchantTxRef,
  senderName,
  narration,
}) => {
  try {
    const auth = await getAccessToken();
    const token = auth.data.access_token;

    const response = await axios.post(
      `${BASE_URL}/v2/transfers/bank`,
      {
        amount,
        accountNumber,
        accountName,
        bankCode,
        merchantTxRef,
        senderName,
        narration,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accountId: process.env.NOMBA_ACCOUNT_ID,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Transfer Error:", error.response?.data || error.message);
    throw error;
  }
};
