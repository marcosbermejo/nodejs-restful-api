import { Application } from 'express';
import request from 'supertest';
import bootstrap from '../../../src/app';
import clubs from '../../fixtures/clubs';
import Club from '../../../src/club/club.model';
import '../setup';

describe('Integration Tests for the Clubs Management', () => {
  let app: Application;

  beforeAll(async () => {
    app = await bootstrap();
  });

  it('Should list clubs', async () => {
    await Club.create(clubs);
    const response = await request(app).get('/clubs');
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(clubs.length);
  });
});
