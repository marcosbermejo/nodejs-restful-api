import mongoose from 'mongoose';
import Club from '../../../src/club/club.model';
import '../setup';

describe('Club Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI ?? '');
  });

  it('Should return all active clubs', async () => {
    await Club.create({ name: 'Club A', address: 'Address A', deleted: false });
    await Club.create({ name: 'Club B', address: 'Address B', deleted: true });

    const activeClubs = await Club.findAllActive();

    expect(activeClubs.length).toBe(1);
    expect(activeClubs[0].name).toBe('Club A');
  });
});
