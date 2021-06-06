import { IProduct } from "./product";

export interface IOrderItem extends IProduct {
  quantity: number;
}

export interface IOrder {
  orderItems: IOrderItem[];
  customer: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderState {
  createOrderStatus: "idle" | "loading" | "success" | "error";
  fetchOrdersStatus: "idle" | "loading" | "success" | "error";
  orders: IOrder[];
  createOrderError: string | null;
  fetchOrdersError: string | null;
}
