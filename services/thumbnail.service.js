import { Thumbnail } from '../models/index.js';
import cloudinaryService from './cloudinary.service.js';

const thumbnailService = {
    create: async (url, publicId, alternative, caption) => {
        try {
            const thumbnail = await Thumbnail.create({
                publicId,
                url,
                alternative,
                caption
            });

            return thumbnail;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getById: async (id) => {
        try {
            return await Thumbnail.findByPk(id);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    update: async (thumbnailId, url, publicId, alternative, caption) => {
        try {
            const thumbnail = await Thumbnail.findByPk(thumbnailId);

            if(!thumbnail) throw new Error("Thumbnail not found.");

            await cloudinaryService.delete(thumbnail.publicId);
            const updatedThumbnail = await Thumbnail.update({
                url,
                publicId,
                alternative,
                caption
            }, { where: { id: thumbnailId } });

            return updatedThumbnail;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    delete: async (id) => {
        try {
            const thumbnail = await Thumbnail.findByPk(id);

            if(!thumbnail) throw new Error("Thumbnail not found.");

            await cloudinaryService.delete(thumbnail.publicId);

            const result = await Thumbnail.destroy({ where: { id: thumbnail.id } });

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default thumbnailService;