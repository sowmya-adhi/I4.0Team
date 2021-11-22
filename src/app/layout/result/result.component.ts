import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ChartsModule, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ResultComponent }]),
    ChartsModule
  ]
})
export class ResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  result: boolean = true;
  breakdown: boolean = false;
  score: boolean = false;

  setActiveButton(id) {
    if (id == 1) {
      this.result = true;
      this.breakdown = false;
      this.score = false;
    }
    else if (id == 2) {
      this.result = false;
      this.breakdown = true;
      this.score = false;
    }
    else if (id == 3) {
      this.result = false;
      this.breakdown = false;
      this.score = true;
    }
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Organizational Readiness', 'Data Readiness', 'Analytics Readiness', 'IT & Operations Readiness', 'Infrastruture Readiness'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [3.5, 4, 2.75, 1.75, 5.25], label: 'Assessment Score' }
  ];

}
