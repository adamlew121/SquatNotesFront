import {Muscle} from './muscle';
import {User} from './user';

export class Exercise {
  id: number;
  name: string;
  targetMuscles: Muscle[];
  author: User;
}
