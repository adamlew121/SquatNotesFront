import { ExerciseService } from './../services/exercise.service';
import { Component, OnInit } from '@angular/core';
import { Muscle } from '../models/muscle';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  constructor(private exerciseService: ExerciseService) {
    this.exerciseService.refreshExerciseList();
  }

  getMuscleNames(muscles: Array<Muscle>) {
    let names = '';
    muscles.forEach(element => {
       names += element.name + ', ';
    });
    if (names.length > 0) {
      names = names.substring(0, names.length - 2);
    }
    return names;
  }

  ngOnInit() {
  }

}
