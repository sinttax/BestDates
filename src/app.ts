import express from 'express';
import cors from 'cors';
import { userRouter, authRouter, navigationRouter } from './route/userRoute';
import { sessions } from './session';
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './Frontend/views'));
app.use(cors());
app.use(express.static(path.resolve(__dirname, './frontend/img')));
app.use(express.static(path.resolve(__dirname, './frontend/scripts')));
app.use(express.static(path.resolve(__dirname, './frontend/styles')));
app.use(express.static(path.resolve(__dirname, './frontend/photo')));
app.use(express.json());
app.use(sessions);

app.use(navigationRouter);
app.use(userRouter);
app.use(authRouter);

export default app;
