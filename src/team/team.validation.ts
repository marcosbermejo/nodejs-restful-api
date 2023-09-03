import { body, param, query } from 'express-validator';
import Club from '../club/club.model';
import { TEAM_NAME_LENGTH, INVALID_ID, CLUB_NOT_FOUND } from '../messages';

export const createTeamValidation = [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage(TEAM_NAME_LENGTH)
    .escape(),

  body('club')
    .isMongoId()
    .withMessage(INVALID_ID)
    .custom(async (value: string) => {
      if (!await Club.findById(value)) {
        throw new Error(CLUB_NOT_FOUND);
      }
      return true;
    }),
];

export const getTeamValidation = [
  param('id')
    .isMongoId()
    .withMessage(INVALID_ID),
];

export const getTeamsValidation = [
  query('clubId')
    .optional()
    .isMongoId()
    .withMessage(INVALID_ID)
    .escape(),
];
