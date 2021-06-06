import { Request, Response, NextFunction } from "express";
import * as UserService from "../services/user";
import ApiError from "../utils/errors";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcryptjs.genSalt(10);
    if (!salt) return next(ApiError.internal());

    const hash = await bcryptjs.hash(password, salt);
    if (!hash) return next(ApiError.internal());

    const user = await UserService.create(username, email, hash);

    const payload = {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "DEVELOPMENT_JWT_SECRET", {
      expiresIn: "3h",
    });

    return res.send({
      token,
      user: payload,
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const user = await UserService.findByUsername(username);
    if (!user) return next(ApiError.authorization("Invalid credentials."));

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) return next(ApiError.authorization("Invalid credentials."));

    const payload = {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "DEVELOPMENT_JWT_SECRET", {
      expiresIn: "3h",
    });

    return res.send({
      token,
      user: payload,
    });
  } catch (error) {
    return next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = jwt.decode(req.headers.authorization, { json: true });

    const user = await UserService.findByUsername(decoded.username);
    if (!user) return next(ApiError.authorization());

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};
