import { PostType } from "@/Types/PostType";
import joi from "joi";

export const postJoiSchema = joi.object<PostType>({
  banner: joi.string().required(),
  title: joi.string().required(),
  text: joi.string().required(),
  likes: joi.array(),
  comments: joi.array(),
});
