import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("Missing MONGODB_URI or MONGO_URI environment variable");
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      "✅ MongoDB Connected"
    );
  } catch (error) {
    console.error(
      "❌ MongoDB Error:",
      error.message
    );

    process.exit(1);
  }
};

export default connectDB;
