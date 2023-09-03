import { Application } from 'express';
import request from 'supertest';
import Club from '../../src/club/club.model';
import Team from '../../src/team/team.model';
import clubs from '../fixtures/clubs';
import teams from '../fixtures/teams';
import bootstrap from '../../src/app';
import { CLUB_NOT_FOUND, INVALID_ID, TEAM_NAME_LENGTH } from '../../src/messages';
import { ITeam } from '../../src/team/team.interface';

describe('Integration Tests for the Teams Management', () => {
  let app: Application;

  beforeAll(async () => {
    app = await bootstrap();
  });

  describe('GET', () => {
    beforeEach(async () => {
      await Club.create(clubs);
      await Team.create(teams);
    });

    it('Should list teams', async () => {
      const { status, body } = await request(app).get('/teams');
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(teams.length);
    });

    it('Should list teams of a given Club ID', async () => {
      const { body } = await request(app).get(`/teams?clubId=${clubs[0]._id}`);
      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(teams.filter((team) => team.club === clubs[0]._id).length);
    });

    it('Should return error 400 for an invalid Club ID', async () => {
      const { status, body: { errors } } = await request(app).get('/teams?clubId=Lorem');

      expect(status).toBe(400);
      expect(errors[0]).toBe(INVALID_ID);
    });

    it('Should return an empty array of teams for a valid non-existent Club ID', async () => {
      const { status, body } = await request(app).get('/teams?clubId=111111111111111111111111');

      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(0);
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
      beforeEach(async () => {
        await Club.create(clubs[0]);
      });

      it('Team without a name', async () => {
        const invalidTeam = { club: clubs[0]._id };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(TEAM_NAME_LENGTH);
      });

      it('Team with a name less than 3 characters', async () => {
        const invalidTeam = { name: 'A', club: clubs[0]._id };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(TEAM_NAME_LENGTH);
      });

      it('Team without club ID', async () => {
        const invalidTeam = { name: 'Cadet Femení' };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(INVALID_ID);
      });

      it('Team with an invalid club ID', async () => {
        const invalidTeam = { name: 'Cadet Femení', club: 'Lorem' };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(INVALID_ID);
      });

      it('Team with a valid non-existent club ID', async () => {
        const invalidTeam = { name: 'Cadet Femení', club: '111111111111111111111111' };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(CLUB_NOT_FOUND);
      });

      it('Team with a valid deleted club ID', async () => {
        const clubId = clubs[0]._id;
        // Delete Club
        await request(app).delete(`/clubs/${clubId}`);

        const invalidTeam = { name: 'Cadet Femení', club: clubId };
        const { status, body: { errors } } = await request(app).post('/teams').send(invalidTeam);

        expect(status).toBe(400);
        expect(errors[0]).toBe(CLUB_NOT_FOUND);
      });
    });
  });

  describe('DELETE', () => {
    it('Should soft delete a team by ID', async () => {
      await Club.create(clubs);
      await Team.create(teams);

      const { _id } = teams[0];

      const { status } = await request(app).delete(`/teams/${_id}`);
      expect(status).toBe(204);

      // Ensure the `deleted` attribute is true
      const { body: { deleted } } = await request(app).get(`/teams/${_id}`);
      expect(deleted).toBe(true);

      // Ensure the deleted team does not appear in the teams list
      const { body }: { body: ITeam[] } = await request(app).get('/teams');
      expect(body.filter((team) => team._id === _id)).toHaveLength(0);
    });

    it('Deleting a Club should soft delete all teams', async () => {
      await Club.create(clubs);
      await Team.create(teams);

      const clubId = clubs[0]._id;

      // Delete Club
      await request(app).delete(`/clubs/${clubId}`);

      const deletedClubTeams = teams.filter((team) => team.club === clubId);

      // Ensure the `deleted` attribute is true for all teams
      // It's allowed to disable no-await-in-loop here.
      // more info: https://eslint.org/docs/latest/rules/no-await-in-loop#when-not-to-use-it

      // eslint-disable-next-line no-restricted-syntax
      for (const { _id } of deletedClubTeams) {
        // eslint-disable-next-line no-await-in-loop
        const { body: { deleted } } = await request(app).get(`/teams/${_id}`);
        expect(deleted).toBe(true);
      }

      // Ensure returns an empty array of teams
      const { status, body } = await request(app).get(`/teams?clubId=${clubId}`);
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(0);
    });
  });
});
