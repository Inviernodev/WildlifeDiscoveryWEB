import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { ChartsService } from '../../../services/charts.service';
import { map } from 'rxjs';
import { getDataDiff } from '../../../utils/utils';
import { groupBy } from '../../../utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tiempo-actividad',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './tiempo-actividad.component.html',
  styleUrls: ['./tiempo-actividad.component.scss']
})
export class TiempoActividadComponent implements OnInit {

  actividades!: any[];
  actividadControl: FormControl<number | null> = new FormControl(null, [Validators.required, Validators.min(1)])



  updateFlag = false;

  Highcharts = Highcharts;
  linechart: Highcharts.Options = {
    title: {
        text: 'Desempeño por estudiante'
    },
    xAxis: {
      labels: {format: '{value:%e/%m/%y}' },
      type: 'datetime',
      dateTimeLabelFormats:{
        month: '%b %e, %Y'
      }
    },
    yAxis: {
      title: {
        text: 'Segundos'
      }
    },
    tooltip: {
      formatter: function() {
        var myDate = new Date(this.x as any);
        var newDateMs = Date.UTC(myDate.getUTCFullYear(),myDate.getUTCMonth()-1,myDate.getUTCDate());
        return '<b>' +
          this.series.name +
          '</b><br/>' +
          Highcharts.dateFormat('Hora Inicio: %H:%M', myDate.getTime()) +
          '<br/>' +
          Highcharts.dateFormat('Fecha: %e/%m/%y', myDate.getTime()) +
          '<br/>Tiempo: ' +
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
  ) {
  }

  ngOnInit(): void {
    this.getActividades();
    this.actividadControl.valueChanges.subscribe((actividad) => {
      console.log(actividad);
      this.getData();
    })
    this.actividadControl.setValue(60008);
  }

  getActividades() {
    this.chartService.get('/charts/select-actividades').subscribe(actividades => {
      this.actividades = actividades;
    });
  }

  getData() {
    this.chartService.get('/charts/tiempo-actividad/'+this.actividadControl.value).pipe(
      map((array: any[]) => {
        array = array.filter((value, index, array) =>
          index === array.findIndex((t) => (
            t.final === value.final && t.inicio === value.inicio
          )
        ));

        let objectKeys = groupBy(array, 'nombres');

        let series: any[] = [];

        Object.keys(objectKeys).forEach((nombre: string) => {
          series.push({
            name: nombre,
            type: 'scatter',
            data: objectKeys[nombre].map((value: any) => {
              let {inicio, final} = value;
              let diff;
              if (inicio && final) {
                diff = getDataDiff(new Date(inicio), new Date(final));
              }
              return [(new Date(inicio)).getTime(), diff?.second];
            })
          })
        });

        return series;
      })
    ).subscribe((resp: any) => {
      this.linechart.series = resp;
      this.updateFlag = true;
    });
  }
}
