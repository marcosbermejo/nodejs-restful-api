import { Model, Document } from 'mongoose';

export default interface IClub extends Document {
  name: string;
  address: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  softDelete(): Promise<IClub>;
}

export interface IClubModel extends Model<IClub> {
  findAllActive(): Promise<IClub[]>;
}

export interface CreateClubDTO {
  name: string;
  address?: string;
}
