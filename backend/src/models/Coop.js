import mongoose from "mongoose";

const coopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    // Nomba Sub Account ID (if using multi-coop support)
    
    nombaSubAccountId: {
      type: String,
      default: null,
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

// Indexes
coopSchema.index({ email: 1 });
coopSchema.index({ status: 1 });

export default mongoose.model("Coop", coopSchema);