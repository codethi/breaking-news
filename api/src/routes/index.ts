import { Router } from "express";
import userRouter from "./UserRoutes";
import swaggerRouter from "./SwaggerRoutes";
import authRouter from "./AuthRoutes";
import postRouter from "./PostRoutes";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/doc", swaggerRouter);

export default router;
