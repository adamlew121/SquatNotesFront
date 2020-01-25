import {Training} from './training';
import {SingleSet} from './single-set';

export interface SuperSet {
  id: number;
  sets: SingleSet[];
}
