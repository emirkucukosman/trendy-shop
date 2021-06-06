import { Request, Response, NextFunction } from "express";
import { IOrderItem } from "../models/Order";
import jwt from "jsonwebtoken";
import * as OrderService from "../services/order";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderItems } = req.body;

    const decoded = jwt.decode(req.headers.authorization, { json: true });

    let total = 0;
    orderItems.map((item: IOrderItem) => (total += item.quantity * item.price));

    const order = await OrderService.create(orderItems, decoded.username, total);

    return res.send(order);
  } catch (error) {
    return next(error);
  }
};

export const getAllOrdersByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = jwt.decode(req.headers.authorization, { json: true });
    const orders = await OrderService.findByCustomer(decoded.username);
    return res.send(orders);
  } catch (error) {
    return next(error);
  }
};
