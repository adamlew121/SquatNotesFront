import {SuperSet} from './super-set';

export class Training {
  id: number;
  user: number;
  name: string;
  date: Date;
  difficulty: number;
  superSetList: SuperSet[];
}
