import { Schema, Document, model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  brand: string;
  slug: string;
  rating: number;
  price: number;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>("Product", productSchema);
