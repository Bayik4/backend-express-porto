import postService from "../services/post.service.js";
import thumbnailService from "../services/thumbnail.service.js";
import Response from "../utils/response.js";

const postController = {
    createPost: async (req, res) => {
        try {
            const { user: { payload: { id } } } = req;
            const { 
                title,
                description,
                slug,
                content,
                type,
                alternative,
                caption
            } = req.body;

            const { path, filename } = req.file

            const thumbnail = await thumbnailService.create(
                path,
                filename,
                alternative,
                caption
            );

            const post = await postService.create(
                id,
                thumbnail.id,
                title,
                description,
                slug,
                content,
                type
            );  

            return Response(res, 201, "Create post successfully.", post);
        } catch (error) {
            return Response(res, 400, "Create post failed.", null, [error.message]);
        }
    },
    getAllPost: async (req, res) => {
        try {
            const posts = await postService.getAll();

            if(posts.length < 1) return Response(res, 200, "Post record is empty.", []);

            return Response(res, 200, "Get all post successfully.", posts);
        } catch (error) {
            return Response(res, 400, "Get all post failed.", null, [error.message]);
        }
    },
    getPostById: async (req, res) => {
        try {
            const { id } = req.params;

            const post = await postService.getById(id);

            return Response(res, 200, "Get post by id successfully.", post);
        } catch (error) {
            return Response(res, 400, "Get post by id failed.", null, [error.message]);
        }
    },
    getPostBySlug: async (req, res) => {
        try {
            const { slug } = req.params;

            const post = await postService.getBySlug(slug);

            if(post === null) return Response(res, 404, "Post not found.", null);

            return Response(res, 200, "Get post by slug successfully.", post);
        } catch (error) {
            return Response(res, 400, "Get post by slug failed.", null, [error.message]);
        }
    },
    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                title,
                description,
                slug,
                content,
                type,
                alternative,
                caption,
                thumbnailId
            } = req.body;

            if(req.file) {
                const { path, filename } = req.file

                await thumbnailService.update(
                    thumbnailId,
                    path,
                    filename,
                    alternative,
                    caption
                );
            }

            const post = await postService.update(
                id,
                title,
                description,
                slug,
                content,
                type
            );

            return Response(res, 200, "Update post successfully.", post);
        } catch (error) {
            return Response(res, 400, "Update post failed.", null, [error.message]);
        }
    },
    deletePost: async (req, res) => {
        try {
            const { id } = req.params;

            await postService.delete(id);

            return Response(res, 200, "Delete post successfully.", { status: true });
        } catch (error) {
            return Response(res, 400, "Delete post failed.", null, [error.message]);
        }
    }
}

export default postController;