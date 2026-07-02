import dotenv from "dotenv";
import { getNombaToken } from "./config/nomba.js";

dotenv.config();

try {
  const token = await getNombaToken();

  console.log("Token Received:");
  console.log(token);
} catch (error) {
  console.error(error.message);
}