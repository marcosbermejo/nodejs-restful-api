import express, { Application } from 'express';
import helmet from 'helmet';

import swaggerUI from 'swagger-ui-express';
import ClubsController from './clubs/clubs.controller';
import TeamsController from './teams/teams.controller';

import swaggerSpec, { uiOptions } from './swagger';

const app: Application = express();

app.use(helmet());
app.use(express.static('public'));

app.use('/clubs', ClubsController);
app.use('/teams', TeamsController);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec, uiOptions));

export default app;
