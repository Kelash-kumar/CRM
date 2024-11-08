import dotenv, { config } from "dotenv";
dotenv.config();
import enviroment from "../utils/environment.js";

export const dbConfig = {
  development: {
    username: enviroment.DB_USER,
    password: enviroment.DB_PASS,
    database: enviroment.DB_NAME,
    host: enviroment.DB_HOST,
    port: enviroment.DB_PORT,
    dialect: "mysql",
  },
};
