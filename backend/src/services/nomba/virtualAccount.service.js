import axios from "axios";
import { getAccessToken } from "./auth.service.js";

export const createVirtualAccount = async (
  accountName,
  accountRef
) => {
  const auth = await getAccessToken();

  const token = auth.data.access_token;

  const response = await axios.post(
    "https://sandbox.nomba.com/v1/accounts/virtual",
    {
      accountRef,
      accountName,
      currency: "NGN",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accountId: process.env.NOMBA_ACCOUNT_ID,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};