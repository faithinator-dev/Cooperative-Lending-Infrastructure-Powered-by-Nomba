import mongoose from "mongoose";

const virtualAccountSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
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

    accountType: {
      type: String,
      enum: ["SAVE", "LOAN"],
      required: true,
    },

    accountRef: {
      type: String,
      required: true,
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

export default mongoose.model("VirtualAccount", virtualAccountSchema);