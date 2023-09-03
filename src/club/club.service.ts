import { IClub } from './club.interface';
import Club from './club.model';

export default class ClubService {
  static async deleteClubAndTeams(club: IClub) {
    const teamDeletionPromises = club.teams.map((team) => team.softDelete());
    await Promise.all(teamDeletionPromises);

    await club.softDelete();
  }

  static async createClub({ name, address }: { name: string, address?: string }) {
    return Club.create({ name: name.toString(), address: address?.toString() });
  }
}
