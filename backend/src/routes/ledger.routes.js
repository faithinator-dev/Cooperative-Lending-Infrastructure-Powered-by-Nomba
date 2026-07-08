import express from "express";
import {
  getAllLedgers,
  getSingleLedger,
} from "../controllers/ledger.controller.js";

const router = express.Router();

router.get("/", getAllLedgers);
router.get("/:id", getSingleLedger);

export default router;