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
  linechart!: any;
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
          type: 'column'
      },
      title: {
          text: 'Desempeño de habilidad motriz'
      },
      xAxis: {
          title: {
              text: 'Ultimos 10 intentos'
          },
          categories: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Cantidad de choques'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} Choques </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Usuario 1',
          data: [1,2,3,4,5,6,7,8,9,10]

      }, {
          name: 'Usuario 2',
          data: [1,2,3,4,5,6,7,8,9,10]

      }, {
          name: 'Usuario 3',
          data: [1,2,3,4,5,6,7,8,9,10]

      }, {
          name: 'Usuario 4',
          data: [1,2,3,4,5,6,7,8,9,10]
      }, {
          name: 'Usuario 5',
          data: [1,2,3,4,5,6,7,8,9,10]
      }]
    }
    console.log(this.linechart);

  }


}
