import {Component, OnInit} from '@angular/core';
// import {Chart} from 'chart.js';
import {ProgressService} from '../services/progress.service';


@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.css']
})
export class ProgressChartComponent implements OnInit {

  chart;
  data = [];
  dataSet = [];
  chartTitle = 'aaaaaa';

  constructor(private progressService: ProgressService) {
    this.progressService.getDataObs().subscribe((data: Array<Date>) => {
      this.data = data;
    });
    this.progressService.getDataSetObs().subscribe((dataSet: Array<number>) => {
      this.dataSet = dataSet;
    });
    this.progressService.getTitleObs().subscribe((title: string) => {
      this.chartTitle = title;
    });
  }

  ngOnInit() {
    // @ts-ignore
    this.chart = new Chart('line', {
      type: 'line',
      options: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: this.chartTitle
        },
      },
      data: {
        labels: this.data,
        datasets: [
          {
            type: 'line',
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            data: this.dataSet,
            fill: false,
          }
        ]
      }
    });
  }
}