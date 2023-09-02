import mongoose from 'mongoose';
import clubs from './clubs';

import ITeam from '../../src/team/team.interface';

const generateObjectId = () => new mongoose.Types.ObjectId().toHexString();

export default [
  {
    _id: generateObjectId(),
    club: clubs[0]._id,
    name: 'Benjamí Femení',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    club: clubs[0]._id,
    name: 'Benjamí Masculí',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    club: clubs[0]._id,
    name: 'Benjamí Mixte',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    club: clubs[1]._id,
    name: 'Aleví Masculí',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    club: clubs[1]._id,
    name: 'Aleví Femení',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    club: clubs[2]._id,
    name: 'Juvenil Masculí',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    club: clubs[2]._id,
    name: 'Juvenil Femení',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as ITeam[];
