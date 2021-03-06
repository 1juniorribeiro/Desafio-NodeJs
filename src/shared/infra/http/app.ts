import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import router from '../../infra/http/routes/index';
import '../../container';
import createConnection from '../typeorm';
import AppError from '../../errors/AppError';
import swaggerFile from '../../../../swagger.json';

createConnection();
const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`
    })
  }
)

export { app };