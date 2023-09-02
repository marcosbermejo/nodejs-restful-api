import mongoose, { Schema } from 'mongoose';
import ITeam from './team.interface';

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
  },
  {
    collection: 'teams',
    timestamps: true,
  },
);

TeamSchema.index({ name: 1 });

export default mongoose.model<ITeam>('Team', TeamSchema);
