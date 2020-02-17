import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../services/training.service';
import {Training} from '../models/training';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  constructor(private trainingService: TrainingService) {
    this.trainingService.getTrainingsByUser(1);
  }

  ngOnInit() {
  }

}
