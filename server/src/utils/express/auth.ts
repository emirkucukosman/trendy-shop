import { Request, Response, NextFunction } from "express";
import ApiError from "../errors";
import jwt from "jsonwebtoken";

const authenticate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      const verify = jwt.verify(token, process.env.JWT_SECRET || "DEVELOPMENT_JWT_SECRET");
      if (!verify) return next(ApiError.authorization());
      return next();
    } catch (error) {
      return next(ApiError.internal());
    }
  };
};

export default authenticate;
