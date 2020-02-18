import { Component, OnInit } from '@angular/core';
import {AppService} from '../services/app.service';
import {TrainingService} from '../services/training.service';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.css']
})
export class TrainingDetailComponent implements OnInit {

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
  }

}
