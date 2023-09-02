import 'express-async-errors';
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import connectDB from './database';

import clubsController from './club/club.controller';
import teamsController from './team/team.controller';

import swaggerSpec, { uiOptions } from './swagger';

import { metricsMiddleware, metricsController } from './metrics';
import errorHandler from './errors';

export default async function bootstrap() {
  await connectDB();

  const app: Application = express();

  app.use(express.static('public'));
  app.use(express.json());
  app.use(helmet());
  app.use(cors({
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use('/clubs', metricsMiddleware, clubsController);
  app.use('/teams', metricsMiddleware, teamsController);
  app.use('/metrics', metricsController);
  app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec, uiOptions));

  app.use(errorHandler);

  return app;
}
