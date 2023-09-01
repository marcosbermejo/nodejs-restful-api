import { Model, Document } from 'mongoose';

export default interface IClub extends Document {
  name: string;
  address: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClubModel extends Model<IClub> {
  findAllActive(): Promise<IClub[]>;
}
