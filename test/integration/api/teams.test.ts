import { Application } from 'express';
import request from 'supertest';
import bootstrap from '../../../src/app';
import '../setup';

describe('Integration Tests for the Teams Management', () => {
  let app: Application;

  beforeAll(async () => {
    app = await bootstrap();
  });

  it('Should list teams', async () => {
    const response = await request(app).get('/teams');
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).not.toHaveLength(0);
  });
});
