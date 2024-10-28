import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const saltRounds = 12;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export function generateToken(payload: any) {
  const secret = process.env.JWT_SECRET!;
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}
