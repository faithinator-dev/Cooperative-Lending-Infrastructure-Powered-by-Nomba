import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    bvn: {
      type: String,
    },
    coopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coop",
    },
    bankDetails: {
      accountNumber: String,
      bankName: String,
      accountName: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Member", memberSchema);