import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import {
  badRequestError,
  conflictError,
  notFoundError,
  unauthorizedError,
} from "@/errors";
import authService from "@/services/AuthService";
import userRepository from "@/repositories/UserRepository";
import { IUser } from "@/schemas/UserSchema/UserMongoSchema";

const createUser = async (data: IUser) => {
  const foundUser = await userRepository.findByEmailUser(data.email);
  if (foundUser) throw conflictError("User already exists");

  const user = await userRepository.createUser(data);
  if (!user) throw badRequestError();

  const token = authService.generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: data.name,
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      background: data.background,
    },
    token,
  };
};

const findAllUser = async () => {
  const users = await userRepository.findAllUser();
  return users;
};

const findUserById = async (userId: string) => {
  const user = await userRepository.findByIdUser(userId);
  if (!user) throw notFoundError();
  return user;
};

const updateUser = async (userId: string, data: IUser) => {
  const user = await userRepository.findByIdUser(userId);

  if (user._id != new ObjectId(userId)) throw unauthorizedError();

  const passwordHashed = await bcrypt.hash(data.password, 10);

  const newUser = {
    ...data,
    password: passwordHashed,
  };

  const userUpdated = await userRepository.updateUser(userId, newUser);

  return userUpdated;
};

export default {
  createUser,
  findAllUser,
  findUserById,
  updateUser,
};
