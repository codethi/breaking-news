import { notFoundError, unauthorizedError } from "@/errors";
import UserRepository from "@/repositories/UserRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function signin(email: string, password: string) {
  const user = await UserRepository.findUserByEmailSignin(email);
  if (!user) throw notFoundError();

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw unauthorizedError();

  const token = generateToken(user.id);

  return token;
}

async function generateToken(id: string) {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 86400,
  });
}

export default { signin, generateToken };
