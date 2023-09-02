import { Application } from 'express';
import request from 'supertest';
import bootstrap from '../../../src/app';
import Club from '../../../src/club/club.model';

import '../setup';
import { ERROR_500 } from '../../../src/messages';

describe('Integration Tests for the Express Application', () => {
  let app: Application;

  beforeAll(async () => {
    app = await bootstrap();
  });

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

    it('Should add CORS headers in the response', async () => {
      const response = await request(app)
        .options('/clubs')
        .set('Origin', 'https://my-domain.com');

      expect(response.status).toBe(204);
      expect(response.headers).toMatchObject({
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'OPTIONS,GET,POST,PATCH,PUT,DELETE',
        'access-control-allow-headers': 'Content-Type,Authorization',
      });
      expect(response.body.contents).toBeUndefined();
    });
  });

  describe('Async error handling', () => {
    it('Should return a centralized 500 error in case of any exception', async () => {
      const createMock = jest.spyOn(Club, 'findAllActive').mockRejectedValue(new Error('Any random error'));
      const response = await request(app).get('/clubs');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe(ERROR_500);

      createMock.mockRestore();
    });
  });
});
