import { Request, Response } from "express";
import User, { IUser } from "../schema/userSchema";
import { hashPassword } from "../utils";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = "customer" } = req.body;
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
    });
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
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
