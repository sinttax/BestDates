import { config } from 'dotenv';

config({ path: '../.env' });

export default {
  port: process.env.SERVER_PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  session: {
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
  },
};
