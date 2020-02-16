import { Component, OnInit } from '@angular/core';
import {AppService} from '../services/app.service';
import {Training} from '../models/training';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  constructor(private appService: AppService, private httpService: HttpService) {
    console.log(appService.fakeUser);
    this.httpService.getTrainingsByUser(appService.fakeUser.id).subscribe((trainings: Array<Training>) => {
      appService.fakeTrainingList = trainings;
      console.log(trainings);
    });
  }

  ngOnInit() {
  }

}
