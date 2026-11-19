import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI or MONGO_URI environment variable");
  }

  // Reuse the warm serverless instance's existing MongoDB connection.
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
  console.log("MongoDB connected");
  return mongoose.connection;
};

export default connectDB;
