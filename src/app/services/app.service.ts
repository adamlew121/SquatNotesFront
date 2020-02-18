import {Injectable} from '@angular/core';
import {Training} from '../models/training';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private title = 'Squat Notes';

  user: User;

  private selectedTraining: Training;

  constructor(private router: Router, private httpService: HttpService) {
  }

  getTitle(): string {
    return this.title;
  }


 // getUserByLoginAndPassword(login: string, password: string) {
 //   this.httpService.getUserByLoginAndPassword('TEST', 'TEST123!').subscribe(user => {
 //     this.user = user;
 //     console.log(user);
 //   });
 // }

}
