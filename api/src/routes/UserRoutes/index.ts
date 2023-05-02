import { Router } from "express";

import userController from "@/controllers/UserController";
import authMiddleware from "@/middlewares/AuthMiddleware";

const userRouter = Router();

userRouter.post("/", userController.createUser);

userRouter.use(authMiddleware);
userRouter.get("/", userController.findAllUser);
userRouter.get("/:id?", userController.findUserById);
userRouter.patch("/:id", userController.updateUser);

export default userRouter;
