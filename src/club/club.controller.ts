import express, { Request, Response } from 'express';
import Club from './club.model';
import { getValidation, createValidation } from './club.validation';
import validate from '../validation';
import getClubById from './club.middleware';

const router = express.Router();

router.get('/:id', validate(getValidation), getClubById, async (req: Request, res: Response) => res.status(200).json(req.club));

router.get('/', async (req: Request, res: Response) => {
  const clubs = await Club.findAllActive();
  return res.status(200).json(clubs);
});

router.post('/', validate(createValidation), async (req: Request, res: Response) => {
  const { name, address } = req.body;
  const newClub = await Club.create({ name, address });
  return res.status(201).json(newClub);
});

router.delete('/:id', validate(getValidation), getClubById, async (req: Request, res: Response) => {
  await req.club?.softDelete();
  return res.status(204).send();
});

export default router;
