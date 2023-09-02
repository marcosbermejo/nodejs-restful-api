import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export default function validate(validations: ValidationChain[]) {
  return [
    ...validations,
    function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
      }

      return next();
    },

  ];
}
