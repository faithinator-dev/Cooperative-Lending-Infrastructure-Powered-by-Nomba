import express from "express";

import {
  getBanks,
  lookupAccount,
  sendMoney,
} from "../controllers/transfer.controller.js";

const router = express.Router();

router.get("/banks", getBanks);

router.post("/lookup", lookupAccount);

router.post("/send", sendMoney);

export default router;