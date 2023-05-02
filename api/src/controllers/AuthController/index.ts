import AuthService from "@/services/AuthService";
import { NextFunction, Request, Response } from "express";

async function signin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as Record<string, string>;

  try {
    const token = await AuthService.signin(email, password);
    return res.send({ token });
  } catch (e) {
    next(e);
  }
}

export default { signin };
