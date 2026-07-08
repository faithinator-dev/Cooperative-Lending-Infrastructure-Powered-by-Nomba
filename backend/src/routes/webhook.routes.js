import express from "express";
import { receiveWebhook } from "../controllers/webhook.controller.js";
import { verifyWebhookSignature } from "../middlewares/webhook.middleware.js";

const router = express.Router();

router.post(
  "/nomba",
  verifyWebhookSignature,
  receiveWebhook
);

export default router;
