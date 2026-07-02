import dotenv from "dotenv";
import connectDB from "./config/database.js";
import Member from "./models/Member.js";

dotenv.config();

await connectDB();

const member =
  await Member.create({
    name: "Faith Test",
    phone: "08012345678",
    bvn: "12345678901",
  });

console.log(member);

process.exit();