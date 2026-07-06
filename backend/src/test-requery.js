import dotenv from "dotenv";
import { requeryTransaction } from "./services/nomba/transaction.service.js";

dotenv.config();

const sessionId = "PUT_YOUR_SESSION_ID_HERE";

try {
  const result = await requeryTransaction(sessionId);
  console.log(result);
} catch (error) {
  console.error(error.message);
}