import Order, { IOrder, IOrderItem } from "../models/Order";
import { IProduct } from "../models/Product";

export const create = async (
  orderItems: IOrderItem[],
  customer: string,
  total: number
): Promise<IOrder> => {
  return await Order.create({ orderItems, customer, total });
};

export const findByCustomer = async (customer: string): Promise<IOrder[]> => {
  return await Order.find({ customer });
};
