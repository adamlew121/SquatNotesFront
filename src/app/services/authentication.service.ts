import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Account} from '../models/account';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpService: HttpService) {
  }

  login(username: string, password: string) {
    return this.httpService.getUserByLoginAndPassword(username, password).pipe(map((user: Account) => {
      if (user) {
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('tempUserId', user.id.toString());
        return user;
      }
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
