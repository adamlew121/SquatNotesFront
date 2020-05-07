import {SuperSet} from './super-set';
import {Account} from './account';

export class Training {
  id: number;
  user: Account;
  name: string;
  date: Date;
  difficulty: number;
  superSetList: SuperSet[];
}
