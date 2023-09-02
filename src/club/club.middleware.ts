import { Request, Response, NextFunction } from 'express';
import Club from './club.model';

import { CLUB_NOT_FOUND } from '../messages';

export default async function getClubById(req: Request, res: Response, next: NextFunction) {
  const clubId = req.params.id;
  const club = await Club.findById(clubId);

  if (!club) {
    return res.status(404).json({ message: CLUB_NOT_FOUND });
  }

  // Place the club in the request to make it available to other controllers
  req.club = club;
  return next();
}
