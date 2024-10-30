import mongoose from "mongoose";
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const MONGODB_URI = process.env.MONGO_URL as string;

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default dbConnect;
