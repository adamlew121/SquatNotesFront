import {Injectable} from '@angular/core';
import {Training} from '../models/training';
import {Account} from '../models/account';
import {Router} from '@angular/router';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private title = 'Squat Notes';

  user: Account;

  private selectedTraining: Training;

  constructor(private router: Router, private httpService: HttpService) {
  }

  getTitle(): string {
    return this.title;
  }


 // getUserByLoginAndPassword(login: string, password: string) {
 //   this.httpService.getUserByLoginAndPassword('TEST123', 'TEST123!').subscribe(user => {
 //     this.user = user;
 //     console.log(user);
 //   });
 // }

}
