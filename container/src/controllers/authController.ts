import { Request, Response } from "express";
import User, { IUser } from "../schema/userSchema";
import { comparePassword, generateToken } from "../utils";
import { ObjectId } from "mongodb";
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const user = await User.findOne({ email });
    console.log("user found ", user?._id.toString());
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid password" });
    }
    //generating the token
    const token = generateToken({ userId: user._id.toString() });
    res.json({ message: "Logged in successfully", access_token: token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
