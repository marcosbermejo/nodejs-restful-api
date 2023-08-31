import request from 'supertest';
import app from '../../src/app';

describe('Integration Tests for the Express Application', () => {
  describe('Documentation', () => {
    it('Should show Swagger Doc on the GET / route', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Waterpolo API Doc');
    });
  });

  describe('Metrics', () => {
    it('Should return metrics data on the GET /metrics route', async () => {
      const response = await request(app).get('/metrics');
      expect(response.status).toBe(200);
      expect(response.text).toContain('process_cpu_user_seconds_total ');
    });
  });

  describe('Security', () => {
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
