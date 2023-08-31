import request from 'supertest';
import app from '../../src/app';

describe('Integration Tests for the Express Application', () => {
  it('Should respond with a "Hello, World!" message on the GET / route', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});
