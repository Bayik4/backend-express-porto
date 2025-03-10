import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import requestValidation from "../middlewares/requestValidation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post('/register', requestValidation.validateCreateUser, authController.register);
authRouter.post('/login', requestValidation.validateLoginUser, authController.loginUser);
authRouter.get("/profile", authMiddleware, authController.profileUser);

export default authRouter;