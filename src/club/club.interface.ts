import { IBase, IBaseModel } from '../base/base.interface';
import { ITeam } from '../team/team.interface';

export interface IClub extends IBase {
  name: string;
  address: string;
  teams: ITeam[];
}

export interface IClubModel extends IBaseModel<IClub> {
  // Add here custom attributes and methods
}

export interface CreateClubDTO {
  name: string;
  address?: string;
}
