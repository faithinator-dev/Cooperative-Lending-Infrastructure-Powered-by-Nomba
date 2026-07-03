import Webhook from "../models/Webhook.js";
import Ledger from "../models/Ledger.js";
import VirtualAccount from "../models/VirtualAccount.js";

export const receiveWebhook = async (req, res) => {
  try {
    console.log("📩 Webhook Received");

    const { transactionRef, eventType, accountNumber, amount } = req.body;

    // Check for duplicate webhook
    const existingWebhook = await Webhook.findOne({ transactionRef });

    if (existingWebhook) {
      return res.status(200).json({
        success: true,
        message: "Webhook already processed",
      });
    }

    // Find the virtual account and its owner
    const virtualAccount = await VirtualAccount.findOne({
      accountNumber,
    }).populate("memberId");

    if (!virtualAccount) {
      return res.status(404).json({
        success: false,
        message: "Virtual account not found",
      });
    }

    // Save webhook
    const webhook = await Webhook.create({
      transactionRef,
      eventType,
      accountNumber,
      amount,
      payload: req.body,
    });

    webhook.status = "PROCESSING";
    await webhook.save();

    await Ledger.create({
      member: virtualAccount.memberId._id,
      virtualAccount: virtualAccount._id,
      transactionType: "SAVINGS",
      entryType: "CREDIT",
      amount,
      transactionRef,
      description: "Savings deposit via Nomba",
      status: "SUCCESS",
    });

    if (virtualAccount.accountType === "SAVE") {
      virtualAccount.balance += amount;
      await virtualAccount.save();
    }

    if (virtualAccount.accountType === "LOAN") {
      console.log("Loan repayment received");

      // TODO : Call processRepayment() from loan.service.js
    }

    webhook.status = "PROCESSED";
await webhook.save();

    // TODO: Day 4
    // If accountType === "LOAN"
    // Call processRepayment() from loan.service.js

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
      webhook,
      virtualAccount,
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
