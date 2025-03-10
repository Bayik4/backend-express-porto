import db from "../config/database.js";
import Thumbnail from "./thumbnail.js";
import User from "./user.js";
import { DataTypes } from "sequelize";

const Post = db.define(
    'Post',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        thumbnailId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Thumbnail,
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        publishedAt: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: ['ARTICLE', 'PROJECT'],
            allowNull: false
        }
    },
    {
        timestamps: false,
        underscored: true
    }
);

export default Post;