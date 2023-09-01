import 'dotenv/config';
import bootstrap from './app';
import logger from './logger';

const port = process.env.PORT ?? 3000;

bootstrap().then((app) => app.listen(port, () => {
  logger.info(`Express App listening on port ${port}`);
}));
