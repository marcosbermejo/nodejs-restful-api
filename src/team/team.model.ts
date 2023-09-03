import mongoose, { Schema } from 'mongoose';
import { ITeam, ITeamModel } from './team.interface';
import BaseSchema from '../base/base.model';

const TeamSchema = new BaseSchema<ITeam, ITeamModel>(
  {
    name: { type: String, required: true, index: true },
    club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
  },
  'teams',
);

TeamSchema.index({ name: 1 });

export default mongoose.model<ITeam, ITeamModel>('Team', TeamSchema);
