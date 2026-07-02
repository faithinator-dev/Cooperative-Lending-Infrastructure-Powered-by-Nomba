import express from "express";
import { receiveWebhook } from "../controllers/webhook.controller.js";
import { verifyWebhookSignature } from "../middlewares/webhook.middleware.js";

const router = express.Router();

router.post(
  "/nomba",
/* // we would uncomment the verifyWebhookSignature middleware once we have the webhook secret from Nomba.
    verifyWebhookSignature, */
  receiveWebhook
);

export default router;