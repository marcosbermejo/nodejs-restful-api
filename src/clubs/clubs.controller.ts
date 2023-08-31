import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json([
    {
      id: 1,
      name: 'Club A',
      location: 'City A',
    },
    {
      id: 2,
      name: 'Club B',
      location: 'City B',
    },
  ]);
});

export default router;
