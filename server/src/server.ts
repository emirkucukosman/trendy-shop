import { Application } from "express";
import configureApp from "./app";

const PORT = process.env.PORT || 9090;
const ENV = process.env.NODE_ENV || "development";

(() => {
  configureApp()
    .then((app: Application) => {
      app.listen(PORT, () => {
        console.log(
          `Application is listening at http://localhost:${PORT} in ${ENV} mode`
        );
      });
    })
    .catch((err: Error) => {
      console.log(`Error while configuring the application: ${err}`);
    });
})();
