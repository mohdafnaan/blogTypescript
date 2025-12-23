import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

const middleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(400).json({ msg: "invalid token" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    req.user = decoded;

    next();
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ msg: "token verification failed" });
  }
};

export default middleware;
