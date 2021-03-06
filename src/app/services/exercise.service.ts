import { Exercise } from './../models/exercise';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Muscle } from '../models/muscle';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exerciseList: Array<Exercise> = [];
  private muscleList: Array<Muscle> = [];

  constructor(private httpService: HttpService) {
    this.httpService.getMuscles().subscribe(muscles => {
      this.muscleList = muscles;
    });
  }

  getExercisesByUser(idUser: number) {
    this.httpService.getExercisesByUser(idUser).subscribe(exercises => {
      this.exerciseList = exercises;
      this.httpService.getDefaultExercises().subscribe((exercisesDef: Array<Exercise>) => {
        this.exerciseList = this.exerciseList.concat(exercisesDef);
        console.log(this.exerciseList);
      });
    });
  }

  getMuscles(): Array<Muscle> {
    return this.muscleList;
  }

  getExerciseList(): Array<Exercise> {
    return this.exerciseList;
  }


}
