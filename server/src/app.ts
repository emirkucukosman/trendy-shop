import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import configureRoutes from "./config/routes";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./utils/express/response";

dotenv.config();

export default async (): Promise<express.Application> => {
  try {
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
    mongoose.connect(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mern.2irp0.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
  } catch (error) {
    console.log(`Error while connecting to MongoDB: ${error}`);
  }

  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  configureRoutes(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
