import { Request, Response, NextFunction } from 'express';
import Team from './team.model';

import { TEAM_NOT_FOUND } from '../messages';

export default async function getTeamById(req: Request, res: Response, next: NextFunction) {
  const teamId = req.params.id;
  const team = await Team.findById(teamId);

  if (!team) {
    return res.status(404).json({ message: TEAM_NOT_FOUND });
  }

  // Place the team in the request to make it available to other controllers
  req.team = team;
  return next();
}
