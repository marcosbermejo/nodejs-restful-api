import { Types } from 'mongoose';
import { IBase, IBaseModel } from '../base/base.interface';

export interface ITeam extends IBase {
  name: string;
  club: Types.ObjectId;
}

export interface ITeamModel extends IBaseModel<ITeam> {
  // Add here custom attributes and methods
}

export interface CreateTeamDTO {
  name: string;
  club: string;
}
