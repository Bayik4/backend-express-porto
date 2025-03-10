import db from '../config/database.js';
import { DataTypes } from 'sequelize';

const Thumbnail = db.define(
    'Thumbnail',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        publicId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alternative: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caption: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        underscored: true
    }
);

export default Thumbnail;