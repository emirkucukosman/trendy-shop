import { Router } from "express";
import * as Controller from "../../controllers/product";

const router = Router();

router.route("/:category?").post(Controller.getAllProducts);
router.route("/:slug").get(Controller.getProductById);

export default router;
