import { Request, Response, NextFunction } from "express";
import * as ProductService from "../services/product";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.params;
    const { brands } = req.body;

    const products = await ProductService.findAll(category ? { category } : {});

    if (brands) {
      const filteredProducts = products.filter((p) => brands.includes(p.brand));
      return res.send(filteredProducts);
    }

    return res.send(products);
  } catch (error) {
    return next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const product = await ProductService.findBySlug(slug);
    return res.send(product);
  } catch (error) {
    return next(error);
  }
};
