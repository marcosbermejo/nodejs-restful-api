import request from 'supertest';
import app from '../../src/app';

describe('Clubs Management', () => {
  it('Should list clubs', async () => {
    const response = await request(app).get('/clubs');
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).not.toHaveLength(0);
  });
});
