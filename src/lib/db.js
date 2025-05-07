import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
// const uri = "mongodb://localhost:27017/ChatApp"

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};
