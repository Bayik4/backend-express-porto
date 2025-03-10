import { Router } from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import postRouter from "./post.router.js";

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);

export default router;