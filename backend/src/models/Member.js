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
trim: true,
},

bvn: {
  type: String,
  required: true,
  unique: true,
  trim: true,
},

memberId: {
  type: String,
  required: true,
      unique: true,
    },
    coopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coop",
    },
    bankDetails: {
      accountNumber: {
        type: String,
      },

      accountName: {
        type: String,
      },

      bankName: {
        type: String,
      },

      bankCode: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Member", memberSchema);
