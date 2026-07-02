import axios from "axios";
import { getAccessToken } from "./auth.service.js";

/**
 * Create a Nomba Virtual Account
 * @param {Object} data
 * @param {string} data.accountRef
 * @param {string} data.accountName
 * @param {string} data.currency
 * @param {string} [data.bvn]
 * @param {number} [data.expectedAmount]
 * @returns {Object}
 */
export const createVirtualAccount = async ({
  accountRef,
  accountName,
  currency = "NGN",
  bvn,
  expectedAmount,
}) => {
  try {
    // Get access token
    const auth = await getAccessToken();
    const token = auth.data.access_token;

    // Build request body
    const payload = {
      accountRef,
      accountName,
      currency,
    };

    if (bvn) payload.bvn = bvn;
    if (expectedAmount) payload.expectedAmount = expectedAmount;

    // Call Nomba API
    const response = await axios.post(
      "https://sandbox.nomba.com/v1/accounts/virtual",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accountId: process.env.NOMBA_ACCOUNT_ID,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Virtual Account Created");

    return response.data;
  } catch (error) {
    console.error(
      "❌ Virtual Account Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};