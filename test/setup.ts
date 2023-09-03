import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import Club from '../src/club/club.model';
import Team from '../src/team/team.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();
});

beforeEach(async () => {
  await Team.deleteMany({});
  await Club.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.disconnect();
});
