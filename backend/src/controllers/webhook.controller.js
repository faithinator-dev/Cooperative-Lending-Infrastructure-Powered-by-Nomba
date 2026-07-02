import Webhook from "../models/Webhook.js";

export const receiveWebhook = async (req, res) => {
  try {
    console.log("Webhook Received[-]");

    const webhook = await Webhook.create({
      transactionRef: req.body.transactionRef,
      eventType: req.body.eventType,
      accountNumber: req.body.accountNumber,
      amount: req.body.amount,
      payload: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Webhook saved successfully",
      data: webhook,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};