import dotenv from 'dotenv';
dotenv.config();

const environment = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
};

export default environment;
