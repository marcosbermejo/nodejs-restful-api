import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';

const app: Application = express();

app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

export default app;
