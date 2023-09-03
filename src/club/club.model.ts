import mongoose from 'mongoose';
import { IClub, IClubModel } from './club.interface';
import BaseSchema from '../base/base.model';

const ClubSchema = new BaseSchema<IClub, IClubModel>(
  {
    name: { type: String, required: true, index: true },
    address: { type: String, required: false },
  },
  'clubs',
);

ClubSchema.index({ name: 1 });

ClubSchema.virtual('teams', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'club',
});

export default mongoose.model<IClub, IClubModel>('Club', ClubSchema);
