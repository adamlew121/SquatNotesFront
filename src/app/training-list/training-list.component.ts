import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Training} from '../models/training';
import {TrainingService} from '../services/training.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  constructor(private trainingService: TrainingService) {
    this.trainingService.getTrainingsByUser(parseInt(localStorage.getItem('tempUserId'), 10));
  }

  ngOnInit() {
  }

}
