import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { ChartsService } from '../../../services/charts.service';
import { map } from 'rxjs';
import { getDataDiff } from '../../../utils/utils';
import { groupBy } from '../../../utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-bote',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './bote.component.html',
  styleUrls: ['./bote.component.scss']
})
export class BoteComponent {

  updateFlag = false;

  Highcharts = Highcharts;
  linechart: Highcharts.Options = {
    title: {
        text: 'Desempeño de la afinación motriz'
    },
    xAxis: {
      labels: {format: '{value:%e/%m/%y}' },
      type: 'datetime',
      dateTimeLabelFormats:{
        month: '%b %e, %Y'
      },
      title: {
        text: 'Fecha'
      }
    },
    yAxis: {
      title: {
        text: 'Cantidad de choques'
      }
    },
    tooltip: {
      formatter: function() {
        var myDate = new Date(this.x as any);
        return '<b>' +
          this.series.name +
          '</b><br/>' +
          Highcharts.dateFormat('Hora Inicio: %H:%M', myDate.getTime()) +
          '<br/>' +
          Highcharts.dateFormat('Fecha: %e/%m/%y', myDate.getTime()) +
          '<br/>Choques: ' +
          this.y + ' seg';
      }
    },
    series: [{
      name: 'test',
      type: 'scatter',
      data: []
    }]
  };

  constructor(
    private chartService: ChartsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.chartService.get('/charts/botes').pipe(

      map((array: any[]) => {

        let objectKeys = groupBy(array, 'nombres');

        let series: any[] = [];

        Object.keys(objectKeys).forEach((nombre: string) => {
          series.push({
            name: nombre,
            type: 'scatter',
            data: objectKeys[nombre].map(({datetime_touch, totalCount}: any) => {
              return [(new Date(datetime_touch)).getTime(), totalCount];
            })
          });
        });

        return series;
      })
    ).subscribe((resp: any) => {
      console.log(resp);
      this.linechart.series = resp;
      this.updateFlag = true;
    });
  }
}
