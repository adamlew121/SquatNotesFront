import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: Array<User> = [];

  constructor(private httpService: HttpService) { }

  loadUserList() {
    this.httpService.getUsers().subscribe(users => {
      this.userList = users;
    });
  }

  getUserList() {
    return this.userList;
  }
}
