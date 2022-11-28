import session from 'express-session';
import config from './config';
const mysql2 = require('mysql2/promise');

const mysqlStore = require('express-mysql-session')(session);
const options = {
  connectionLimit: 10,
  password: config.db.password,
  user: config.db.username,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
};

const connection = mysql2.createPool(options);
const sessionStore = new mysqlStore({}, connection);

export const sessions = session({
  name: 'mySession',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 3,
    sameSite: false,
    secure: false,
  },
  secret: 'mostsecret!',
});
