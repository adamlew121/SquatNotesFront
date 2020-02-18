import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Training} from '../models/training';
import {ChartPoint} from '../models/chart-point';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private trainingList: Array<Training> = [];
  private trainingListObs = new BehaviorSubject<Array<Training>>(this.trainingList);
  private selectedTraining: Training;
  fakeUser: User;

  constructor(private httpService: HttpService, private router: Router) {
  }

  getTrainingsByUser(idUser: number) {
    this.httpService.getTrainingsByUser(idUser).subscribe(trainings => {
      this.trainingList = trainings;
      console.log(trainings);
    });
  }

  getTrainingListObs(): Observable<Array<Training>> {
    return this.trainingListObs.asObservable();
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
}
