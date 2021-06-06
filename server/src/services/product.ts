import { FilterQuery } from "mongoose";
import Product, { IProduct } from "../models/Product";

export const findAll = async (filter: FilterQuery<IProduct>): Promise<IProduct[]> => {
  return await Product.find(filter).sort({ createdAt: -1 });
};

export const findBySlug = async (slug: string): Promise<IProduct> => {
  return await Product.findOne({ slug });
};
