import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';

import router from '../../infra/http/routes/index';
import '../../container';
import createConnection from '../typeorm';

createConnection();
const app = express();
app.use(express.json());

app.use(router)

export { app };