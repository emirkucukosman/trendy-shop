import { Schema, Document, model } from "mongoose";
import { IProduct } from "./Product";

export interface IOrderItem extends IProduct {
  quantity: number;
}

export interface IOrder extends Document {
  orderItems: IOrderItem[];
  customer: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema(
  {
    orderItems: {
      type: [],
      required: true,
    },
    customer: {
      type: String,
      required: true,
      trim: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IOrder>("Order", orderSchema);
