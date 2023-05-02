import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export interface IUser extends Partial<Document> {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  background: string;
  createdAt?: Date;
}

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
