import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ChartPoint} from '../models/chart-point';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChartData} from '../models/chart-data';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private chartData: ChartData = new ChartData();

  private chartDataObs = new BehaviorSubject<ChartData>(this.chartData);

  constructor(private httpService: HttpService) {
  }

  getChartPoints(idUser: number, exerciseName: string) {
    this.httpService.getChartPoints(idUser, exerciseName).subscribe(chartPoints => {
      this.chartData.chartTitle = exerciseName;
      // console.log(chartPoints);
      this.getDataFromChartPoints(chartPoints);
      // console.log(this.chartData.data);
      // console.log(this.chartData.dataSet);
    });
  }

  getDataFromChartPoints(chartPoints: Array<ChartPoint>) {
    this.chartData.data.length = 0;
    this.chartData.dataSet.length = 0;
    chartPoints.forEach(chartPoint => {
      this.chartData.data.push(chartPoint.date);
      this.chartData.dataSet.push(chartPoint.weight);
    });
    this.chartDataObs.next(this.chartData);
  }

  getCharDataObs(): Observable<ChartData> {
    return this.chartDataObs.asObservable();
  }
}
