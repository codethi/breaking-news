import { UserType } from "@/Types/UserType";
import joi from "joi";

export const userJoiSchema = joi.object<UserType>({
  name: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  avatar: joi.string().required(),
  background: joi.string().required(),
});
