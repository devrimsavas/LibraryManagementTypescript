import dotenv from "dotenv";
dotenv.config();

const Port = process.env.PORT || 3000;
import createError from "http-errors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.js";

// Sequelize setup and model imports
import { Sequelize } from "sequelize";
import Book from "./models/BookModel.js";
import Client from "./models/ClientModel.js";
import Library from "./models/LibraryModel.js";
import Role from "./models/RoleModel.js";
import Genre from "./models/GenreModel.js";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sequelize initialization
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

// Initialize models
const db: any = {
  sequelize,
  Sequelize,
  Book: Book(sequelize),
  Client: Client(sequelize),
  Library: Library(sequelize),
  Role: Role(sequelize),
  Genre: Genre(sequelize),
};

// Associate models if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync DB and create roles before adding admin
db.sequelize.sync({ force: true }).then(async () => {
  // Ensure roles exist
  const roles = await db.Role.findAll();
  if (roles.length === 0) {
    await db.Role.bulkCreate([
      { roleName: "admin" },
      { roleName: "user" },
      { roleName: "guest" },
    ]);
    console.log("Roles seeded.");
  }

  // Check if admin exists
  const adminExists = await db.Client.findOne({
    where: { email: process.env.ADMINCLIENT_EMAIL },
  });
  if (!adminExists) {
    await db.Client.create({
      name: "Admin",
      email: process.env.ADMINCLIENT_EMAIL,
      password: process.env.ADMINCLIENT_PASSWORD, // Password hashing will be handled by the model's hook
      roleId: 1, // Admin roleId assumed to be 1
      telephone: "123456567778",
    });
    console.log("Admin account created.");
  } else {
    console.log("Admin account already exists.");
  }
});

// Express app setup
const app: express.Application = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "classes")));

// Router binding
app.use("/", indexRouter);

app.listen(Port, () => {
  console.log(`Server Listening at Port ${Port}`);
});

export default db;
