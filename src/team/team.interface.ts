import { Document, Types } from 'mongoose';
import IClub from '../club/club.interface';

export default interface ITeam extends Document {
  name: string;
  club: Types.ObjectId | IClub;
  createdAt: Date;
  updatedAt: Date;
}
