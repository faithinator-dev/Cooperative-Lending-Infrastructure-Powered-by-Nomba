import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
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
      trim: true,
    },

    memberId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    coop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coop",
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

export default mongoose.model("Member", memberSchema);
module.exports = mongoose.model("Member", memberSchema);
