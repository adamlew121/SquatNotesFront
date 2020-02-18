import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ChartPoint} from '../models/chart-point';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private chartPoints: Array<ChartPoint> = [];
  private data: Array<Date> = [];
  private dataSet: Array<number> = [];
  private chartTitle = '';

  private chartPointsObs = new BehaviorSubject<Array<ChartPoint>>(this.chartPoints);
  private dataObs = new BehaviorSubject<Array<Date>>(this.data);
  private dataSetObs = new BehaviorSubject<Array<number>>(this.dataSet);
  private chartTitleObs = new BehaviorSubject<string>(this.chartTitle);

  constructor(private httpService: HttpService) {
  }

  getChartPoints(idUser: number, exerciseName: string) {
    this.httpService.getChartPoints(idUser, exerciseName).subscribe(chartPoints => {
      this.chartPoints = chartPoints;
      this.chartTitle = exerciseName;
      console.log(chartPoints);
      this.getDataFromchartPoints();
      console.log(this.data);
      console.log(this.dataSet);
    });
  }

  getDataFromchartPoints() {
    this.data.length = 0;
    this.dataSet.length = 0;
    this.chartPoints.forEach(chartPoint => {
      this.data.push(chartPoint.date);
      this.dataSet.push(chartPoint.weight);
    });
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
