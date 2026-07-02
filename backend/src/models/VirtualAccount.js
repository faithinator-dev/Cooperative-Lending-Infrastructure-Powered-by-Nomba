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
    },

    bankName: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

virtualAccountSchema.index({
  accountNumber: 1,
});

export default mongoose.model(
  "VirtualAccount",
  virtualAccountSchema
);