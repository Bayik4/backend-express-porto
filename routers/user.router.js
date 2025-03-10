import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.put('/', userController.update);

export default userRouter;