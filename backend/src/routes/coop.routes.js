import express from "express";
import {
  createCoopController,
  getCoopsController,
  getCoopByIdController,
  updateCoopController,
  deleteCoopController,
} from "../controllers/coop.controller.js";

const router = express.Router();

router.post("/", createCoopController);
router.get("/", getCoopsController);
router.get("/:id", getCoopByIdController);
router.put("/:id", updateCoopController);
router.delete("/:id", deleteCoopController);

export default router;