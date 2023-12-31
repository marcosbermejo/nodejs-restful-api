import mongoose from 'mongoose';
import { IClub } from '../../src/club/club.interface';

const generateObjectId = () => new mongoose.Types.ObjectId().toHexString();

export default [
  {
    _id: generateObjectId(),
    name: 'Unió Esportiva d\'Horta',
    address: 'Address 0, Barcelona',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Natació Barcelona',
    address: 'Address 1, Barcelona',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Natació Sabadell',
    address: 'Address 2, Sabadell',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Esportiu Mediterrani',
    address: 'Address 3, Barcelona',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Natació Terrassa',
    address: 'Address 4, Terrassa',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Natació Atlètic-Barceloneta',
    address: 'Address 5, Barcelona',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Natació Sant Andreu',
    address: 'Address 6, Barcelona',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Natació Montjuïc',
    address: 'Address 7, Barcelona',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Natació Rubí',
    address: 'Address 8, Rubí',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Natació Igualada',
    address: 'Address 9, Igualada',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: generateObjectId(),
    name: 'Club Natació Reus Ploms',
    address: 'Address 10, Reus',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as IClub[];
