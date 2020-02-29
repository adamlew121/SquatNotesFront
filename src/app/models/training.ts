import {SuperSet} from './super-set';
import {User} from './user';

export class Training {
  id: number;
  user: User;
  name: string;
  date: Date;
  difficulty: number;
  superSetList: SuperSet[];
}
