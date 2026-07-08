import mongoose from "mongoose";

const virtualAccountSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    accountType: {
      type: String,
      enum: ["SAVE", "LOAN"],
      required: true,
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },

    accountName: {
      type: String,
      required: true,
    },

    bankName: {
      type: String,
      required: true,
    },

    nombaAccountRef: {
      type: String,
      required: true,
      unique: true,
    },

    balance: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("VirtualAccount", virtualAccountSchema);