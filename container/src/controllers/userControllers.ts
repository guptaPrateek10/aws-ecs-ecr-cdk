import { Request, Response } from "express";
import User, { IUser } from "../schema/userSchema";
import { hashPassword } from "../utils";
import mongoose from "mongoose";
import { uploadToS3 } from "../middleware/upload";
import fileUpload = require("express-fileupload");

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = "user", username } = req.body;
    // Validate the input data
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    //hash the password
    const hashedPassword = await hashPassword(password);
    // Create a new user document
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      username,
    });
    // Save the user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  } finally {
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, id } = req.body;
    // Validate the input data
    if (!name && !email) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
    });
    console.log("user update call", req.files);
    if (!req.files || !req.files.avatar) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Image file is required" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });
    const imageFile = req.files.avatar as fileUpload.UploadedFile;
    const folderName = `${user._id}`;
    const imageUrl = await uploadToS3(
      imageFile.data,
      imageFile.name,
      folderName
    );
    await User.findByIdAndUpdate(id, { avatar: imageUrl });
    await user.save({ session });

    const updatedUser = await User.findById(id);
    await session.commitTransaction();
    session.endSession();
    res.status(200).json(updatedUser);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Error updating user", error });
  }
};
