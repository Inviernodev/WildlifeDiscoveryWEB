import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
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
  selector: 'app-plataformas',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './plataformas.component.html',
  styleUrls: ['./plataformas.component.scss']
})
export class PlataformasComponent implements OnInit {

  updateFlag = false;

  Highcharts = Highcharts;
  linechart: Highcharts.Options = {
    title: {
        text: 'Número de materiales que los/as estudiantes reconocen mientras juegan en las distintas sesiones'
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
          '<br/>' +
          Highcharts.dateFormat('Fecha: %e/%m/%y', myDate.getTime()) +
          '<br/>Intentos: ' +
          this.y;
      }
    },
    series: [{
      name: 'test',
      type: 'bar',
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
    this.chartService.get('/charts/plataformas').pipe(
      map((array: any[]) => {

        array = array.map(values => {
          values.datetime_touch = formatDate(values.datetime_touch, 'YYYY-MM-dd', 'en');
          return values;
        });
        console.log(array);


        let objectKeys = groupBy(array, 'nombres');

        let series: any[] = [];

        Object.keys(objectKeys).forEach((nombre: string) => {

          let groupByDate = groupBy(objectKeys[nombre], 'datetime_touch');
          let data = Object.entries(groupByDate).map(([date, array]: any) => [
            (new Date(date)).getTime(),
            array.length,
          ]);

          series.push({
            name: nombre,
            type: 'bar',
            data
          });
        });

        return series;
      })
    ).subscribe((resp: any) => {
      this.linechart.series = resp;
      this.updateFlag = true;
    });
  }
}
