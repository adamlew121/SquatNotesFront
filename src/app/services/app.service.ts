import {Injectable} from '@angular/core';
import {Training} from '../models/training';
import {Account} from '../models/account';
import {Router} from '@angular/router';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  title = 'Squat Notes';

  benchPressBlackIcon = 'assets/img/benchPress.png';
  benchPressWhiteIcon = 'assets/img/benchPressWhite.png';

  deadliftBlackIcon = 'assets/img/deadlift.png';
  deadliftWhiteIcon = 'assets/img/deadliftWhite.png';

  squatBlackIcon = 'assets/img/squat.png';
  squatWhiteIcon = 'assets/img/squatWhite.png';

  ohpBlackIcon = 'assets/img/ohp.png';
  ohpWhiteIcon = 'assets/img/ohpWhite.png';


  logoSquatNotes = 'assets/img/logoSquatNotes.png';

  user: Account;

  constructor() {
  }
}
