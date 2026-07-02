import dotenv from "dotenv";
import { createVirtualAccount } from "./services/nomba/virtualAccount.service.js";

dotenv.config();

async function testVA() {
  try {
    const response = await createVirtualAccount(
      "Faith Savings",
      `SAVE-${Date.now()}`
    );

    console.log(
      JSON.stringify(response, null, 2)
    );
  } catch (error) {
    console.error(error);
  }
}

testVA();