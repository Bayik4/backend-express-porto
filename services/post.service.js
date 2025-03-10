import { Post, Thumbnail, User } from "../models/index.js";
import { generateSlug } from "../utils/slug.js";
import thumbnailService from "./thumbnail.service.js";

const postService = {
    create: async (userId, thumbnailId, title, description, slug, content, type) => {
        try {
            const post = await Post.create({
                userId,
                thumbnailId,
                title,
                description,
                slug: slug ? generateSlug(slug) : generateSlug(title),
                content,
                createdAt: null,
                type
            });
            
            return post;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAll: async () => {
        try {
            const posts = await Post.findAll({ 
                attributes: ['id', 'title', 'description', 'slug', 'publishedAt'],
                include: [
                    { model: User, as: 'user', attributes: ['username', 'photo'] }, 
                    { model: Thumbnail, as: 'thumbnail', attributes: ['url', 'alternative', 'caption', 'publicId'] }
                ] 
            });

            return posts;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getById: async (id) => {
        try {
            const post = await Post.findByPk(id, {
                include: [{ model: Thumbnail, as: 'thumbnail' }]
            });

            if(!post) throw new Error("Post not found.");

            return post;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getBySlug: async (slug) => {
        try {
            const post = await Post.findOne({ 
                where: { slug } ,
                attributes: ['id', 'title', 'description', 'slug', 'content', 'publishedAt'],
                include: [
                    { model: User, as: 'user', attributes: ['username', 'photo'] },
                    { model: Thumbnail, as: 'thumbnail', attributes: ['id', 'url', 'alternative', 'caption'] }
                ]
            });

            return post;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    update: async (postId, title, description, slug, content, type) => {
        try {
            const post = await Post.update({
                title,
                description,
                slug,
                content,
                type
            }, { where: { id: postId } });

            return post;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    delete: async (id) => {
        try {
            const post = await Post.findByPk(id);

            if(!post) throw new Error("Post not found.");

            await thumbnailService.delete(post.thumbnailId);

            const result = await Post.destroy({ where: { id: post.id } });

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default postService;