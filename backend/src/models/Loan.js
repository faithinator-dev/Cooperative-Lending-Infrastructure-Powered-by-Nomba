import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    principal: {
      type: Number,
      required: true,
      min: 0,
    },

    interestRate: {
      type: Number,
      required: true,
      min: 0,
    },

    tenorMonths: {
      type: Number,
      required: true,
      min: 1,
    },

    monthlyDue: {
      type: Number,
      required: true,
    },

    balance: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "PAID", "ARREARS"],
      default: "PENDING",
    },

    disbursedAt: {
      type: Date,
      default: null,
    },

    transferId: {
      type: String,
    },

    merchantTxRef: {
      type: String,
    },

    transferStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "PENDING_BILLING", "FAILED", "REFUND"],
      default: "PENDING",
    },

    penalty: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Loan", loanSchema);
