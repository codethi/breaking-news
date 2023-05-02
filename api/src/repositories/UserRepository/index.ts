import User, { IUser } from "@/schemas/UserSchema/UserMongoSchema";

const findByEmailUser = (email: string) => User.findOne({ email: email });

const createUser = (body: IUser) => User.create(body);

const findAllUser = () => User.find();

const findByIdUser = (idUser: string) => User.findById(idUser);

const updateUser = (userId: string, data: IUser) =>
  User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      data,
    },
    {
      rawResult: true,
    }
  );

const findUserByEmailSignin = (email: string) =>
  User.findOne({ email: email }).select("+password");

export default {
  findByEmailUser,
  createUser,
  findAllUser,
  findByIdUser,
  updateUser,
  findUserByEmailSignin,
};
