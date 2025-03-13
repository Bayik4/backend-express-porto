import { Sequelize } from "sequelize";
import env from 'dotenv';

env.config();

const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const dbName = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const db = new Sequelize(dbName, username, password, {
    host,
    dialect,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
    },
    logging: false
});

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default db;