import { body, param } from 'express-validator';
import { CLUB_NAME_LENGTH, INVALID_ID } from '../messages';

export const createClubValidation = [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage(CLUB_NAME_LENGTH)
    .escape(),
];

export const getClubValidation = [
  param('id')
    .isMongoId()
    .withMessage(INVALID_ID),
];
