import express, { Request, Response } from 'express';
import Club from './club.model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const clubs = await Club.findAllActive();
  res.status(200).json(clubs);
});

export default router;
