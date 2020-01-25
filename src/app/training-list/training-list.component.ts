import { Component, OnInit } from '@angular/core';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
