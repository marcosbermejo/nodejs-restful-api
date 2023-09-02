import { NextFunction, Request, Response } from 'express';
import logger from './logger';
import { ERROR_500 } from './messages';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(ERROR_500, err);
  res.status(500).json({ message: ERROR_500 });
  next(err);
}
