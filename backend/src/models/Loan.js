const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    member: {
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

    monthlyPayment: {
      type: Number,
      required: true,
      min: 0,
    },

    outstandingBalance: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "APPROVED",
        "ACTIVE",
        "COMPLETED",
        "DEFAULTED",
      ],
      default: "PENDING",
    },

    approvalDate: {
      type: Date,
    },

    dueDate: {
      type: Date,
    },

    disbursedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loan", loanSchema);