import request from 'supertest';
import app from '../../src/app';

describe('Teams Management', () => {
  it('Should list teams', async () => {
    const response = await request(app).get('/teams');
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).not.toHaveLength(0);
  });
});
