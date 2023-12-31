import express, { Request, Response } from 'express';
import Club from './club.model';
import { getClubValidation, createClubValidation } from './club.validation';
import validate from '../validation';
import getClubById from './club.middleware';
import { CreateClubDTO } from './club.interface';
import ClubService from './club.service';

const router = express.Router();

router.get('/:id', validate(getClubValidation), getClubById, async (req: Request, res: Response) => {
  const { club } = req;
  res.status(200).json(club);
});

router.get('/', async (req: Request, res: Response) => {
  const clubs = await Club.findAllActive();
  return res.status(200).json(clubs);
});

router.post('/', validate(createClubValidation), async (req: Request<{}, {}, CreateClubDTO>, res: Response) => {
  const { name, address } = req.body;
  const newClub = await ClubService.createClub({ name, address });
  return res.status(201).json(newClub);
});

router.delete('/:id', validate(getClubValidation), getClubById, async (req: Request, res: Response) => {
  if (req.club) {
    await ClubService.deleteClubAndTeams(req.club);
  }
  return res.status(204).send();
});

export default router;
