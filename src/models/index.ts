import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Book from "../models/BookModel.js";
import Client from "../models/ClientModel.js";
import Library from "../models/LibraryModel.js";
import Role from "../models/RoleModel.js";

dotenv.config();

// Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.ADMIN_USERNAME as string,
  process.env.ADMIN_PASSWORD as string,
  {
    host: process.env.HOST,
    dialect: "postgres",
    port: parseInt(process.env.POSTGRESQL_PORT as string, 10),
    logging: console.log,
  }
);

// Initialize the database object and models
const db: { [key: string]: any } = {
  sequelize,
  Sequelize,
  Book: Book(sequelize),
  Client: Client(sequelize),
  Library: Library(sequelize),
  Role: Role(sequelize),
};

// Check and associate models
Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

export default db;
