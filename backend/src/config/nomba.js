import { getAccessToken } from "../services/nomba/auth.service.js";

let accessToken = null;
let tokenExpiry = null;

export async function getNombaToken() {
  const now = Date.now();

  // Return cached token if still valid
  if (
    accessToken &&
    tokenExpiry &&
    now < tokenExpiry
  ) {
    return accessToken;
  }

  // Get fresh token
  const authResponse = await getAccessToken();

  accessToken = authResponse.data.access_token;

  // Expire 1 minute before actual expiry
  tokenExpiry =
    new Date(authResponse.data.expiresAt).getTime() -
    60 * 1000;

  return accessToken;
}