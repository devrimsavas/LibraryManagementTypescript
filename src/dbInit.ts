// dbInit.ts

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Book from "./models/BookModel";
import Client from "./models/ClientModel";
import Library from "./models/LibraryModel";
import Role from "./models/RoleModel";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.ADMIN_USERNAME as string,
  process.env.ADMIN_PASSWORD as string,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT as "postgres",
    port: parseInt(process.env.POSTGRESQL_PORT as string, 10),
    logging: console.log,
  }
);

const db: any = {
  sequelize,
  Sequelize,
  Book: Book(sequelize),
  Client: Client(sequelize),
  Library: Library(sequelize),
  Role: Role(sequelize),
};

// Associate models if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
