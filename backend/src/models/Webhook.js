const mongoose = require("mongoose");

const webhookSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
      trim: true,
    },

    transactionRef: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    signature: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["RECEIVED", "PROCESSED", "FAILED"],
      default: "RECEIVED",
    },

    processedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Webhook", webhookSchema);