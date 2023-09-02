import express, { Request, Response } from 'express';
import Club from './club.model';
import { getValidation, createValidation } from './club.validation';
import validate from '../validation';
import { CLUB_NOT_FOUND } from '../messages';

const router = express.Router();

router.get('/:id', validate(getValidation), async (req: Request, res: Response) => {
  const clubId = req.params.id;
  const club = await Club.findById(clubId);

  if (!club) {
    return res.status(404).json({ message: CLUB_NOT_FOUND });
  }

  return res.status(200).json(club);
});

router.get('/', async (req: Request, res: Response) => {
  const clubs = await Club.findAllActive();
  return res.status(200).json(clubs);
});

router.post('/', validate(createValidation), async (req: Request, res: Response) => {
  const { name, address } = req.body;
  const newClub = await Club.create({ name, address });
  return res.status(201).json(newClub);
});

export default router;
