import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import router from '../../infra/http/routes/index';

const app = express();
app.use(express.json());

app.use(router)

export { app };