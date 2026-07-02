import dotenv from "dotenv";
import { getAccessToken } from "./services/nomba/auth.service.js";

dotenv.config();

const testAuth = async () => {
  try {
    const result = await getAccessToken();

    console.log("✅ Authentication Successful");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.log("❌ Authentication Failed");
    console.error(error.message);
  }
};

testAuth();