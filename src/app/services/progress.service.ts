import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ChartPoint} from '../models/chart-point';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private data: Array<Date> = [];
  private dataSet: Array<number> = [];
  private chartTitle = '';

  private dataObs = new BehaviorSubject<Array<Date>>(this.data);
  private dataSetObs = new BehaviorSubject<Array<number>>(this.dataSet);
  private chartTitleObs = new BehaviorSubject<string>(this.chartTitle);

  constructor(private httpService: HttpService) {
  }

  getChartPoints(idUser: number, exerciseName: string) {
    this.httpService.getChartPoints(idUser, exerciseName).subscribe(chartPoints => {
      this.chartTitle = exerciseName;
      console.log(chartPoints);
      this.getDataFromChartPoints(chartPoints);
      console.log(this.data);
      console.log(this.dataSet);
    });
  }

  getDataFromChartPoints(chartPoints: Array<ChartPoint>) {
    this.data.length = 0;
    this.dataSet.length = 0;
    chartPoints.forEach(chartPoint => {
      this.data.push(chartPoint.date);
      this.dataSet.push(chartPoint.weight);
    });
    this.dataObs.next(this.data);
    this.dataSetObs.next(this.dataSet);
    this.chartTitleObs.next(this.chartTitle);
  }

  getDataObs(): Observable<Array<Date>> {
    return this.dataObs.asObservable();
  }

  getDataSetObs(): Observable<Array<number>> {
    return this.dataSetObs.asObservable();
  }

  getTitleObs(): Observable<string> {
    return this.chartTitleObs.asObservable();
  }
}
