import dotenv from "dotenv";

dotenv.config();

export async function getAccessToken() {
  const url = `${process.env.NOMBA_BASE_URL}/v1/auth/token/issue`;

  const payload = {
    grant_type: "client_credentials",
    client_id: process.env.NOMBA_CLIENT_ID,
    client_secret: process.env.NOMBA_CLIENT_SECRET,
  };

  console.log("Account ID:", process.env.NOMBA_ACCOUNT_ID);
  console.log("Client ID:", process.env.NOMBA_CLIENT_ID);
  console.log(
    "Client Secret:",
    process.env.NOMBA_CLIENT_SECRET?.slice(0, 10) + "...",
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accountId: process.env.NOMBA_ACCOUNT_ID,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(data)}`);
    }

    return data;
  } catch (error) {
    console.error("Nomba Authentication Error:", error.message);
    throw error;
  }
}
