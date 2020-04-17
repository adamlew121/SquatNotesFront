import { Component, OnInit } from '@angular/core';
import {ProgressService} from '../services/progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor(private progressService: ProgressService) { }

  ngOnInit() {
  }

  selectExercise(nameExercise: string) {
    this.progressService.getChartPoints(parseInt(localStorage.getItem('tempUserId'), 10), nameExercise);
  }
}
