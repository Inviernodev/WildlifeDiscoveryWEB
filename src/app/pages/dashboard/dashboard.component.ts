import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/services/charts.service';
import * as Highcharts from 'highcharts';
import { formatDate } from '@angular/common';

var groupBy = function(xs: any[], key: string | number) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Highcharts = Highcharts;
  linechart!: Highcharts.Options;
  showGraph: boolean = false;

  constructor(
    private chartService: ChartsService
  ) {}

  ngOnInit(): void {
    this.getDataChartTest();
  }

  getDataChartTest() {
    this.chartService.getChartTest().subscribe((resp: any[]) => {
      let result = resp.map(r => {
        return {
          x: (new Date(r.datetime_touch)).getTime(),
          y: r.id_actividad,
        }
      });
      this.setChart(result);

      setTimeout(() => {
        this.showGraph = true;
      }, 1000);
    });
  }

  setChart(resp: any[]) {
    console.log(resp);
    this.linechart = {
      chart: {
        type: "spline",
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 1000 * 3600 * 24 * 1,
        labels: { // los objetos se reemplazan completamente en un assign
          format: "{value:%d %b %y }"
        },
        dateTimeLabelFormats: {
          day: '%e. %b %H:%M'
        }
      },
      series: [{
        type: 'spline',
        turboThreshold: 500000,
        data: resp
      }]
    }
  }


}
