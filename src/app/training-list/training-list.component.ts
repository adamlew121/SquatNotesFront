import { Component, OnInit } from '@angular/core';
import {Training} from '../models/training';
import {TrainingService} from '../services/training.service';

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
