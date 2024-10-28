// models/User.ts

import mongoose, { Schema, Document, Types } from "mongoose";

// Define an interface representing a user document in MongoDB.
export interface IUser extends Document {
  _id: Types.ObjectId; // Unique identifier for each user document
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";

  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const userSchema = new Schema<IUser>(
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
