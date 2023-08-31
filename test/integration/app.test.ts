import request from 'supertest';
import app from '../../src/app';

describe('Integration Tests for the Express Application', () => {
  it('Should respond with a "Hello, World!" message on the GET / route', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });

  it('Should respond add security headers', async () => {
    const response = await request(app).get('/');

    expect(response.headers).toMatchObject({
      'x-dns-prefetch-control': 'off',
      'x-frame-options': 'SAMEORIGIN',
      'x-content-type-options': 'nosniff',
    });
  });

  it('Should not include x-powered-by header', async () => {
    const response = await request(app).get('/');

    expect(response.headers['x-powered-by']).toBeUndefined();
  });
});
