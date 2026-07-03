import axios from "axios";
import { getAccessToken } from "./auth.service.js";

/**
 * Requery a transaction using its sessionId
 * @param {string} sessionId
 */
export const requeryTransaction = async (sessionId) => {
  try {
    // Get Nomba access token
    const auth = await getAccessToken();
    const token = auth.data.access_token;

    // Call Nomba Requery API
    const response = await axios.get(
      `https://sandbox.nomba.com/v1/transactions/requery/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accountId: process.env.NOMBA_ACCOUNT_ID,
        },
      }
    );

    console.log("✅ Transaction Requery Successful");

    return response.data;
  } catch (error) {
    console.error(
      "[X] Transaction Requery Failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};