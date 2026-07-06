import crypto from "crypto";

export const verifyWebhookSignature = (req, res, next) => {
  try {
    const signature = req.headers["x-nomba-signature"];

    if (!signature) {
      return res.status(401).json({
        success: false,
        message: "Missing webhook signature",
      });
    }

    const payload = JSON.stringify(req.body);

    const hash = crypto
      .createHmac("sha512", process.env.NOMBA_WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

    if (hash !== signature) {
      return res.status(401).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};