import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {ProgressService} from '../services/progress.service';
import {ChartData} from '../models/chart-data';


@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.css']
})
export class ProgressChartComponent implements OnInit {

  chart;
  chartData: ChartData = new ChartData();
  options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: true,
    title: {
      display: true,
      text: this.chartData.chartTitle
    }
  };

  constructor(private progressService: ProgressService) {
    this.progressService.getChartDataObs().subscribe((chartData: ChartData) => {
      this.chartData = chartData;
      if (this.chart) {
        this.chart.options.title.text = chartData.chartTitle;
        this.chart.update();
      }
    });
  }

  ngOnInit() {
    // @ts-ignore
    this.chart = new Chart('line', {
      type: 'line',
      options: this.options,
      data: {
        labels: this.chartData.data,
        datasets: [
          {
            type: 'line',
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            data: this.chartData.dataSet,
            fill: false,
          }
        ]
      }
    });
  }
}
