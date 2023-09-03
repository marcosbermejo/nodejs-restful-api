import { Model, Document, FilterQuery } from 'mongoose';

export interface IBase extends Document {
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  softDelete(): Promise<IBase>;
}

export interface IBaseModel<T extends IBase> extends Model<T> {
  findAllActive(filter?: FilterQuery<T>): Promise<T[]>;
}
