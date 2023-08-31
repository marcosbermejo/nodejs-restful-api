import {
  Router, Request, Response, NextFunction,
} from 'express';
import { Counter, collectDefaultMetrics, register } from 'prom-client';

collectDefaultMetrics();

const requestsCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests handled by the server',
  labelNames: ['method', 'url', 'status'],
});

function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  requestsCounter.labels(req.method, req.originalUrl, res.statusCode.toString()).inc();
  next();
}

const metricsController = Router();

metricsController.get('/', async (req, res) => {
  const metrics = await register.metrics();

  res.set('Content-Type', register.contentType);
  res.end(metrics);
});

export { metricsMiddleware, metricsController };
