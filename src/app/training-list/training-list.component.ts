import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Training} from '../models/training';
import {TrainingService} from '../services/training.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  idUser;
  canDelete;

  constructor(private trainingService: TrainingService, private route: ActivatedRoute) {
    this.idUser = this.route.snapshot.paramMap.get('id');
    if (!this.idUser) {
      this.idUser = parseInt(localStorage.getItem('tempUserId'), 10);
      this.canDelete = true;
    } else {
      this.canDelete = false;
    }
    this.trainingService.getTrainingsByUser(this.idUser);
  }

  ngOnInit() {
  }

}
