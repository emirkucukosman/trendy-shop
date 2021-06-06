import { Application } from "express";

import UserRouter from "./user";
import ProductRouter from "./product";
import OrderRouter from "./order";

export default (app: Application) => {
  app.use("/api/user", UserRouter);
  app.use("/api/products", ProductRouter);
  app.use("/api/orders", OrderRouter);
};
