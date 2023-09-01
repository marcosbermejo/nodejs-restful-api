import mongoose, { Schema } from 'mongoose';
import IClub, { IClubModel } from './club.interface';

const ClubSchema = new Schema<IClub, IClubModel>(
  {
    name: { type: String, required: true, index: true },
    address: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    collection: 'clubs',
    timestamps: true,
    statics: {
      async findAllActive() {
        return this.find({ deleted: false });
      },
    },
  },
);

ClubSchema.index({ name: 1 });

export default mongoose.model<IClub, IClubModel>('Club', ClubSchema);
export { ClubSchema };
