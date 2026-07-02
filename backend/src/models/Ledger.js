import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      default: null,
    },

    virtualAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VirtualAccount",
      required: true,
    },

    transactionType: {
      type: String,
      enum: [
        "SAVINGS",
        "LOAN_DISBURSEMENT",
        "LOAN_REPAYMENT",
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

    balanceAfter: {
      type: Number,
      default: 0,
    },

    transactionRef: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    nombaTransactionId: {
      type: String,
      default: null,
    },

    narration: {
      type: String,
      trim: true,
      default: "",
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

// Indexes
ledgerSchema.index({ transactionRef: 1 });
ledgerSchema.index({ memberId: 1 });
ledgerSchema.index({ loanId: 1 });
ledgerSchema.index({ virtualAccountId: 1 });

export default mongoose.model("Ledger", ledgerSchema);