import { Router } from "express";
import * as Controller from "../../controllers/order";

const router = Router();

router.route("/").get(Controller.getAllOrdersByUsername);
router.route("/").post(Controller.createOrder);

export default router;
