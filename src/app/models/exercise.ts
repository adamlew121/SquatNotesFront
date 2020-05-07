import {Muscle} from './muscle';
import {Account} from './account';

export class Exercise {
  id: number;
  name: string;
  targetMuscles: Muscle[];
  author: Account;
}
