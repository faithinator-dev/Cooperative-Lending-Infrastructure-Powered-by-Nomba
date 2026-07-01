async function getAccessToken() {
  const url = "https://sandbox.nomba.com/v1/auth/token/issue";

  const payload = {
    grant_type: "client_credentials",
    client_id: process.env.NOMBA_CLIENT_ID,
    client_secret: process.env.NOMBA_CLIENT_SECRET,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accountId": process.env.NOMBA_ACCOUNT_ID,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `${response.status}: ${JSON.stringify(data)}`
      );
    }

    console.log("Authentication successful");

    return data;
  } catch (error) {
    console.error("Authentication failed:", error.message);
    throw error;
  }
}