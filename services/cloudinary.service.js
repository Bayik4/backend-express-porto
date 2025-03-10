import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import env from 'dotenv';

env.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryService = {
    upload: () => {
        const storage = new CloudinaryStorage({
            cloudinary,
            params: {
                folder: 'thumbnails',
                format: async () => 'webp',
                public_id: (req, file) => `thumb_${Date.now()}`,
                transformation: [
                    { quality: "auto" },
                    { fetch_format: "auto" } 
                ]
            }
        });
        
        return multer({ storage });
    },
    delete: async (publicId) => {
        try {
            return await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default cloudinaryService;