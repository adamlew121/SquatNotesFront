import { Component, OnInit } from '@angular/core';
import {ProgressService} from '../services/progress.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  providers: [ProgressService]
})
export class ProgressComponent implements OnInit {

  idUser;

  constructor(private progressService: ProgressService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('id');
  }

  selectExercise(nameExercise: string) {
    this.progressService.getChartPoints(this.idUser, nameExercise);
  }
}
