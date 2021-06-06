import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import ApiError from "./errors";

export const validateBody = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = schema.validate(req.body);
      if (validation.error) return next(ApiError.badRequest(validation.error.message));
      return next();
    } catch (error) {
      return next(error);
    }
  };
};

export const validateParams = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = schema.validate(req.params);
      if (validation.error) return next(ApiError.badRequest(validation.error.message));
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
