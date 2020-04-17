import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Training} from '../models/training';
import {Router} from '@angular/router';
import {SuperSet} from '../models/super-set';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private trainingList: Array<Training> = [];
  private selectedTraining: Training;
  private superSets: Array<SuperSet> = [];

  constructor(private httpService: HttpService, private router: Router) { }

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

  deleteTraining(selectedTraining: Training): void {
    console.log('deleteTraining in service');
    this.httpService.deleteTraining(parseInt(localStorage.getItem('tempUserId'), 10), selectedTraining).subscribe(
      data => {
        this.getTrainingsByUser(parseInt(localStorage.getItem('tempUserId'), 10));
      },
      error => {
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
