import User from "./user.js";
import Post from "./post.js";
import Thumbnail from "./thumbnail.js";
import db from "../config/database.js";

try {
    User.hasMany(Post, {as: 'posts', foreignKey: "userId", onDelete: "CASCADE"});
    Post.belongsTo(User, {as: 'user', foreignKey: "userId"});

    Thumbnail.hasOne(Post, { as: 'post', foreignKey: 'thumbnailId' });
    Post.belongsTo(Thumbnail, { as: 'thumbnail', foreignKey: 'thumbnailId' });

    db.sync({alter: true});

    console.log('Database sync successfully.');
} catch (error) {
    console.log('Error sync database:', error);
}

export {User, Post, Thumbnail};