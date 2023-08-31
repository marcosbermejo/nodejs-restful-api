import request from 'supertest';
import app from '../../src/app';

describe('Integration Tests for the Express Application', () => {
  it('Should show Swagger Doc on the GET / route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Waterpolo API Doc');
  });

  describe('Security headers', () => {
    it('Should add security headers in the response', async () => {
      const response = await request(app).get('/clubs');
      expect(response.headers).toMatchObject({
        'x-dns-prefetch-control': 'off',
        'x-frame-options': 'SAMEORIGIN',
        'x-content-type-options': 'nosniff',
      });
    });

    it('Should not include x-powered-by header in the response', async () => {
      const response = await request(app).get('/clubs');
      expect(response.headers['x-powered-by']).toBeUndefined();
    });
  });
});
