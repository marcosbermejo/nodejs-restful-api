import express, { Request, Response } from 'express';
import Team from './team.model';
import validate from '../validation';
import { createTeamValidation, getTeamValidation, getTeamsValidation } from './team.validation';
import { TEAM_NOT_FOUND } from '../messages';

const router = express.Router();

router.get('/:id', validate(getTeamValidation), async (req: Request, res: Response) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({ message: TEAM_NOT_FOUND });
  }

  return res.status(200).json(team);
});

router.get('/', validate(getTeamsValidation), async (req: Request, res: Response) => {
  const { clubId } = req.query;
  const filter = clubId ? { club: clubId.toString() } : {};
  const teams = await Team.find(filter);

  return res.status(200).json(teams);
});

router.post('/', validate(createTeamValidation), async (req: Request, res: Response) => {
  const { name, club } = req.body;
  const teamData = { name: name.toString(), club: club.toString() };
  const newTeam = await Team.create(teamData);

  return res.status(201).json(newTeam);
});

export default router;
