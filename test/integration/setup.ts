import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import Club from '../../src/club/club.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();
});

beforeEach(async () => {
  await Club.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.disconnect();
});
