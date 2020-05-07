import { AuthSuperGuard } from './../guard/AuthSuper.guard';
import { Component, OnInit } from '@angular/core';
import {AppService} from '../services/app.service';
import { AuthGuard } from '../guard/Auth.guard';
import { element } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private appService: AppService) { }
  ngOnInit() {
  }

  isUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if ( user && user.type === 0) {
      return true;
    } else {
      return false;
    }
  }

  isSupport() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if ( user && user.type === 1) {
      return true;
    } else {
      return false;
    }
  }

}
