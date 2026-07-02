const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    loan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
    },

    virtualAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VirtualAccount",
      required: true,
    },

    transactionType: {
      type: String,
      enum: [
        "SAVINGS",
        "LOAN_REPAYMENT",
        "LOAN_DISBURSEMENT",
        "PENALTY",
      ],
      required: true,
    },

    entryType: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    transactionRef: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ledger", ledgerSchema);