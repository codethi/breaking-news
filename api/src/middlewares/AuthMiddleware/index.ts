import { loadEnv } from "@/config/envs";
import { unauthorizedError } from "@/errors";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import userService from "@/services/UserService";

loadEnv();

interface ITokenPayload extends JwtPayload {
  id: string;
}

function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw unauthorizedError();

  const parts = authHeader.split(" ");
  if (parts.length !== 2) throw unauthorizedError();
  
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) throw unauthorizedError();

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    try {
      const { id } = decoded as ITokenPayload;
      if (err) throw unauthorizedError();

      const user = await userService.findUserById(id);

      if (!user) throw unauthorizedError();

      res.locals.user = user;

      return next();
    } catch (e) {
      next(e);
    }
  });
}

export default AuthMiddleware;
