import mongoose from "mongoose";

const virtualAccountSchema = new mongoose.Schema(
  {
    memberId: {
const mongoose = require("mongoose");

const virtualAccountSchema = new mongoose.Schema(
  {
    member: {
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
      trim: true,
    },

    accountName: {
      type: String,
      required: true,
      trim: true,
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
      required: true,
      trim: true,
    },

    accountReference: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    accountType: {
      type: String,
      enum: ["SAVINGS", "LOAN"],
      required: true,
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

virtualAccountSchema.index({
  accountNumber: 1,
});

export default mongoose.model(
  "VirtualAccount",
  virtualAccountSchema
);
module.exports = mongoose.model("VirtualAccount", virtualAccountSchema);
