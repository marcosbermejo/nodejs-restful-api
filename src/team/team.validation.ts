import { body, param } from 'express-validator';
import mongoose from 'mongoose';
import Club from '../club/club.model';
import { TEAM_NAME_LENGTH, INVALID_ID, CLUB_NOT_FOUND } from '../messages';

export const createTeamValidation = [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage(TEAM_NAME_LENGTH)
    .escape(),

  body('club')
    .custom(async (value: string) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error(INVALID_ID);
      }

      if (!await Club.findById(value)) {
        throw new Error(CLUB_NOT_FOUND);
      }

      return true;
    }),
];

export const getTeamValidation = [
  param('id')
    .custom((value: string) => mongoose.isValidObjectId(value))
    .withMessage(INVALID_ID),
];
