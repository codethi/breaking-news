import AuthController from "@/controllers/AuthController";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", AuthController.signin);

export default authRouter;
