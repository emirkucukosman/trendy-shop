import { Router } from "express";
import authenticate from "../../utils/express/auth";
import { validateBody } from "../../utils/validator";
import { registerSchema, loginSchema } from "../../validation/user";
import * as Controller from "../../controllers/user";

const router = Router();

router.route("/register").post(validateBody(registerSchema), Controller.register);
router.route("/login").post(validateBody(loginSchema), Controller.login);
router.route("/me").get(authenticate(), Controller.me);

export default router;
