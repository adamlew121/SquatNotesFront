import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Training} from '../models/training';
import {ChartPoint} from '../models/chart-point';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {AppService} from './app.service';
import {Exercise} from '../models/exercise';
import {SuperSet} from '../models/super-set';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private trainingList: Array<Training> = [];
  private selectedTraining: Training;
  private exerciseList: Array<Exercise> = [];
  private superSets: Array<SuperSet> = [];
  fakeUser: User;

  constructor(private httpService: HttpService, private appService: AppService, private router: Router) { }

  getTrainingsByUser(idUser: number) {
    this.httpService.getTrainingsByUser(idUser).subscribe(trainings => {
      this.trainingList = trainings;
    });
  }

  selectTraining(selectedTraining: Training): void {
    this.selectedTraining = selectedTraining;
    this.router.navigate(['/training-detail']);
  }

  getSelectedTraining(): Training {
    return this.selectedTraining;
  }

  getTrainingList(): Array<Training> {
    return this.trainingList;
  }

  getExerciseList(): Array<Exercise> {
    return this.exerciseList;
  }

  deleteTraining(selectedTraining: Training): void {
    console.log('deleteTraining in service');
    this.httpService.deleteTraining(parseInt(localStorage.getItem('tempUserId'), 10), selectedTraining).subscribe(
      data => {
        this.getTrainingsByUser(parseInt(localStorage.getItem('tempUserId'), 10));
        console.log('weszlo: ' + data);
      },
      error => {
        console.log('nope');
        console.log(error);
      }
    );

  }

  setSuperSets(superSets: Array<SuperSet>) {
    this.superSets = superSets;
  }

  getSuperSets(): Array<SuperSet> {
    return this.superSets;
  }
}
