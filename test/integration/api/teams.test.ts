import { Application } from 'express';
import request from 'supertest';
import Club from '../../../src/club/club.model';
import Team from '../../../src/team/team.model';
import clubs from '../../fixtures/clubs';
import teams from '../../fixtures/teams';
import bootstrap from '../../../src/app';
import '../setup';
import { CLUB_NOT_FOUND, INVALID_ID, TEAM_NAME_LENGTH } from '../../../src/messages';

describe('Integration Tests for the Teams Management', () => {
  let app: Application;

  beforeAll(async () => {
    app = await bootstrap();
  });

  describe('GET', () => {
    it('Should list teams', async () => {
      await Club.create(clubs);
      await Team.create(teams);
      const { body } = await request(app).get('/teams');
      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(teams.length);
    });
  });

  describe('POST', () => {
    it('Should create a team when providing a name with more than 3 characters and a valid club ID', async () => {
      await Club.create(clubs[0]);
      const validTeam = { name: 'Cadet Femení', club: clubs[0]._id };
      const { status, body: { name, _id } } = await request(app).post('/teams').send(validTeam);

      expect(status).toBe(201);
      expect(_id).not.toBeUndefined();
      expect(name).toBe(validTeam.name);

      // Ensure the team is present in the database.
      const response = await request(app).get(`/teams/${_id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(validTeam.name);
    });

    describe('Error 400', () => {
      it('Team without a name', async () => {
        await Club.create(clubs[0]);

        const invalidTeam = { club: clubs[0]._id };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(TEAM_NAME_LENGTH);
      });

      it('Team with a name less than 3 characters', async () => {
        await Club.create(clubs[0]);

        const invalidTeam = { name: 'A', club: clubs[0]._id };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(TEAM_NAME_LENGTH);
      });

      it('Team without club ID', async () => {
        await Club.create(clubs[0]);

        const invalidTeam = { name: 'Cadet Femení' };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(INVALID_ID);
      });

      it('Team with an invalid club ID', async () => {
        await Club.create(clubs[0]);

        const invalidTeam = { name: 'Cadet Femení', club: 'Lorem' };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(INVALID_ID);
      });

      it('Team with a valid non-existent club ID', async () => {
        await Club.create(clubs[0]);

        const invalidTeam = { name: 'Cadet Femení', club: '111111111111111111111111' };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(CLUB_NOT_FOUND);
      });
    });
  });
});
