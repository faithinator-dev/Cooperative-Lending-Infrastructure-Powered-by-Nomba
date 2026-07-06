import express from "express";
import {
  addMember,
  getAllMembers,
  getSingleMember,
  editMember,
  removeMember,
} from "../controllers/member.controller.js";

const router = express.Router();

router.post("/", addMember);
router.get("/", getAllMembers);
router.get("/:id", getSingleMember);
router.put("/:id", editMember);
router.delete("/:id", removeMember);

export default router;