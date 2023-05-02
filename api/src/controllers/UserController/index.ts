import { IUser } from "@/schemas/UserSchema/UserMongoSchema";
import userService from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as IUser;
  try {
    const user = await userService.createUser(data);
    return res.send(user);
  } catch (e) {
    next(e);
  }
};

const findAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.findAllUser();
    return res.send(users);
  } catch (e) {
    next(e);
  }
};

const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = res.locals.user;

  try {
    const user = await userService.findUserById(id);
    return res.send(user);
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = res.locals.user;
  const data = req.body as IUser;

  try {
    const user = await userService.updateUser(id, data);
    return res.send(user);
  } catch (e) {
    next(e);
  }
};

export default {
  createUser,
  findAllUser,
  findUserById,
  updateUser,
};
