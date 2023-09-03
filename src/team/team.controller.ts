import express, { Request, Response } from 'express';
import Team from './team.model';
import validate from '../validation';
import { createTeamValidation, getTeamValidation, getTeamsValidation } from './team.validation';
import getTeamById from './team.middleware';
import { CreateTeamDTO } from './team.interface';

const router = express.Router();

router.get('/:id', validate(getTeamValidation), getTeamById, async (req: Request, res: Response) => {
  const { team } = req;
  return res.status(200).json(team);
});

router.get('/', validate(getTeamsValidation), async (req: Request, res: Response) => {
  const { clubId } = req.query;
  const filter = clubId ? { club: clubId.toString() } : {};
  const teams = await Team.findAllActive(filter);

  return res.status(200).json(teams);
});

router.post('/', validate(createTeamValidation), async (req: Request<{}, {}, CreateTeamDTO>, res: Response) => {
  const { name, club } = req.body;
  const teamData = { name: name.toString(), club: club.toString() };
  const newTeam = await Team.create(teamData);

  return res.status(201).json(newTeam);
});

router.delete('/:id', validate(getTeamValidation), getTeamById, async (req: Request, res: Response) => {
  await req.team?.softDelete();
  return res.status(204).send();
});

export default router;
