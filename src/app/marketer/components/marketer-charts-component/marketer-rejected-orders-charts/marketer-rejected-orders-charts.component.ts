import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  title?: ApexTitleSubtitle;
};

@Component({
  selector: 'app-marketer-rejected-orders-charts',
  templateUrl: './marketer-rejected-orders-charts.component.html',
  styleUrls: ['./marketer-rejected-orders-charts.component.css'],
})
export class MarketerRejectedOrdersChartsComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'My First Angular Chart',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
    };
  }
}
