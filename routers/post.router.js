import { Router } from "express";
import postController from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import cloudinaryService from "../services/cloudinary.service.js";

const postRouter = Router();

postRouter.post('/', authMiddleware, cloudinaryService.upload().single('thumbnail'), postController.createPost);
postRouter.get('/', authMiddleware, postController.getAllPost);
postRouter.get('/:id', authMiddleware, postController.getPostById);
postRouter.get('/:slug', authMiddleware, postController.getPostBySlug);
postRouter.put('/:id', authMiddleware, cloudinaryService.upload().single('thumbnail'), postController.updatePost);
postRouter.delete('/:id', authMiddleware, postController.deletePost);

export default postRouter;