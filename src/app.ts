import express, { Application } from 'express';
import helmet from 'helmet';

import swaggerUI from 'swagger-ui-express';
import clubsController from './clubs/clubs.controller';
import teamsController from './teams/teams.controller';

import swaggerSpec, { uiOptions } from './swagger';

import { metricsMiddleware, metricsController } from './metrics';

const app: Application = express();

app.use(helmet());
app.use(express.static('public'));

app.use('/clubs', metricsMiddleware, clubsController);
app.use('/teams', metricsMiddleware, teamsController);
app.use('/metrics', metricsController);

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec, uiOptions));

export default app;
