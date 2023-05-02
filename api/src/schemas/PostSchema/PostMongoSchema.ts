import { Schema, model, Document, PopulatedDoc } from "mongoose";
import { IUser } from "../UserSchema/UserMongoSchema";

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  comments: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export interface IPost extends Partial<Document> {
  _id: Schema.Types.ObjectId;
  title: string;
  banner: string;
  text: string;
  likes: [];
  comments: [];
  user: PopulatedDoc<IUser>;
}

const Post = model<IPost>("Post", PostSchema);

export default Post;
