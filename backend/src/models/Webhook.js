import mongoose from "mongoose";

const webhookSchema = new mongoose.Schema(
  {
    transactionRef: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    eventType: {
      type: String,
      enum: [
        "PAYMENT_SUCCESS",
        "PAYMENT_FAILED",
        "PAYOUT_SUCCESS",
        "PAYOUT_FAILED",
        "PAYMENT_REVERSAL",
        "ORDER_SUCCESS",
      ],
      required: true,
    },

    accountNumber: {
      type: String,
      default: null,
    },

    amount: {
      type: Number,
      default: 0,
    },

    processed: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "RECEIVED",
        "PROCESSING",
        "PROCESSED",
        "FAILED",
      ],
      default: "RECEIVED",
    },

    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    errorMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
webhookSchema.index({ transactionRef: 1 });
webhookSchema.index({ eventType: 1 });
webhookSchema.index({ processed: 1 });

export default mongoose.model("Webhook", webhookSchema);