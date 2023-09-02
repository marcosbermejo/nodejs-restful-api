import { Application } from 'express';
import request from 'supertest';
import bootstrap from '../../../src/app';
import clubs from '../../fixtures/clubs';
import Club from '../../../src/club/club.model';
import '../setup';
import { CLUB_NAME_LENGTH, INVALID_ID } from '../../../src/messages';
import IClub from '../../../src/club/club.interface';

describe('Integration Tests for the Clubs Management', () => {
  let app: Application;

  beforeAll(async () => {
    app = await bootstrap();
  });

  describe('GET', () => {
    it('Should list clubs', async () => {
      await Club.create(clubs);
      const { body } = await request(app).get('/clubs');
      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(clubs.length);
    });

    it('Should return a club when GET /clubs/:id with an existing ID', async () => {
      await Club.create(clubs);
      const existingClub = clubs[0];
      const { status, body: { name } } = await request(app).get(`/clubs/${existingClub._id}`);

      expect(status).toBe(200);
      expect(name).toBe(existingClub.name);
    });

    it('Should return a 404 error when GET /clubs/:id with a non-existent valid ID', async () => {
      const nonExistentId = '111111111111111111111111';
      const { status, body: { message } } = await request(app).get(`/clubs/${nonExistentId}`);

      expect(status).toBe(404);
      expect(message).toBe('Club not found');
    });

    it('Should return a 400 error when GET /clubs/:id with an invalid ID', async () => {
      const nonValidId = 'Lorem';
      const { status, body: { errors } } = await request(app).get(`/clubs/${nonValidId}`);

      expect(status).toBe(400);
      expect(errors[0]).toBe(INVALID_ID);
    });
  });

  describe('POST', () => {
    it('Should create a club when providing a name with more than 3 characters', async () => {
      const validClub = { name: 'Waterpolo Club' };
      const { status, body: { name, _id } } = await request(app).post('/clubs').send(validClub);

      expect(status).toBe(201);
      expect(_id).not.toBeUndefined();
      expect(name).toBe(validClub.name);

      // Ensure the club is prseent in the database.
      const response = await request(app).get(`/clubs/${_id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(validClub.name);
    });

    it('Should return error 400 when creating a club without a name', async () => {
      const invalidClub = {};
      const { status, body: { errors } } = await request(app).post('/clubs').send(invalidClub);

      expect(status).toBe(400);
      expect(errors[0]).toBe(CLUB_NAME_LENGTH);
    });

    it('Should return error 400 when creating a club with a name less than 3 characters', async () => {
      const invalidClub = { name: 'A' };
      const { status, body: { errors } } = await request(app).post('/clubs').send(invalidClub);

      expect(status).toBe(400);
      expect(errors[0]).toBe(CLUB_NAME_LENGTH);
    });

    it('Should ignore a given _id in the body when creating a club', async () => {
      const randomId = '111111111111111111111111';
      const validClub = { name: 'Waterpolo Club', _id: randomId };

      const { body: { _id } } = await request(app).post('/clubs').send(validClub);
      expect(_id).not.toBe(randomId);

      // Ensure the given ID was ignored.
      const { status } = await request(app).get(`/clubs/${randomId}`);
      expect(status).toBe(404);

      // Ensure the club was created with a new ID.
      const { body: { name } } = await request(app).get(`/clubs/${_id}`);
      expect(name).toBe(validClub.name);
    });

    it('Should ignore a given deleted attribute in the body when creating a club', async () => {
      const validClub = { name: 'Waterpolo Club', deleted: true };
      const { body: { _id } } = await request(app).post('/clubs').send(validClub);

      // Ensure the `deleted` attribute was ignored and it's not deleted.
      const { body: { deleted } } = await request(app).get(`/clubs/${_id}`);
      expect(deleted).toBe(false);
    });
  });

  describe('DELETE', () => {
    it('Should soft delete a club by ID', async () => {
      await Club.create(clubs);

      const { status } = await request(app).delete(`/clubs/${clubs[0]._id}`);
      expect(status).toBe(204);

      // Ensure the `deleted` attribute is true
      const { body: { deleted } } = await request(app).get(`/clubs/${clubs[0]._id}`);
      expect(deleted).toBe(true);

      // Ensure the deleted club does not appear in the list
      const { body }: { body: IClub[] } = await request(app).get('/clubs');
      expect(body.filter((club) => club._id === clubs[0]._id)).toHaveLength(0);
    });

    it('Should return a 404 error when deleting a non-existent valid ID', async () => {
      const nonExistentId = '111111111111111111111111';
      const { status, body: { message } } = await request(app).delete(`/clubs/${nonExistentId}`);

      expect(status).toBe(404);
      expect(message).toBe('Club not found');
    });

    it('Should return a 400 error when deleting an invalid ID', async () => {
      const nonValid = 'Lorem';
      const { status, body: { errors } } = await request(app).delete(`/clubs/${nonValid}`);

      expect(status).toBe(400);
      expect(errors[0]).toBe(INVALID_ID);
    });
  });
});
