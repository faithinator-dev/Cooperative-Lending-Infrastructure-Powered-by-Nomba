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
      enum: ["ACTIVE", "PAID", "ARREARS"],
      default: "ACTIVE",
    },

    disbursedAt: {
      type: Date,
      default: Date.now,
    },

    penalty: {
        type: Number,
        default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Loan", loanSchema);