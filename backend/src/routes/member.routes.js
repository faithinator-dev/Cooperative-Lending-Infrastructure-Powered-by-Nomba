import express from "express";
import { addMember } from "../controllers/member.controller.js";

const router = express.Router();

router.post("/", addMember);

export default router;