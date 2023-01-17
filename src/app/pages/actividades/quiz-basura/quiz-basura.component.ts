import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { ChartsService } from '../../../services/charts.service';
import { map } from 'rxjs';
import { groupBy } from '../../../utils';

type TQuizaBasura = {[key: string]: {Correcta: number, Incorrecta: number, label: string}};

@Component({
  selector: 'app-quiz-basura',
  templateUrl: './quiz-basura.component.html',
  styleUrls: ['./quiz-basura.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule
  ]
})
export class QuizBasuraComponent implements OnInit{
  updateFlag = false;

  Highcharts = Highcharts;
  linechart: any = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Número de características (tamaño, cubierta corporal, hábitat) que los/as estudiantes reconocen mientras juegan en las distintas sesiones de la actividad quiz'
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Intentos'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [
      {
        name: 'Correcta',
        data: []
      },
      {
        name: 'Incorrecta',
        data: []
      }
    ]
  };

  constructor(
    private chartService: ChartsService
  ) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.chartService.get('/charts/quiz')
    .pipe(
      map(values => {
        let grouped: any[] = groupBy(values, 'id');
        let datosFiltrados: any = {};
        console.log(grouped);
        Object.keys(grouped).forEach((idUser: any) => {
          datosFiltrados[idUser] = grouped[idUser].reduce((prev: any, {correcta, nombres, apellido_paterno, apellido_materno}: any) => {
            return {
              Correcta: prev.Correcta + (correcta === 0 ? 0 : 1),
              Incorrecta: prev.Incorrecta + (correcta === 0 ? 1 : 0),
              label: nombres + ' ' + apellido_paterno + ' ' + apellido_materno
            }
          }, {Correcta: 0, Incorrecta: 0})
        });
        return datosFiltrados;
      })
    ).subscribe((resp: TQuizaBasura) => {
      console.log(resp);
      this.linechart.xAxis.categories = [];
      this.linechart.series[0].data = [];
      this.linechart.series[1].data = [];
      Object.keys(resp).forEach(idUser => {
        this.linechart.xAxis.categories.push(resp[idUser].label);
        this.linechart.series[0].data.push(resp[idUser].Correcta);
        this.linechart.series[1].data.push(resp[idUser].Incorrecta);
      });
      this.updateFlag = true;
    });
  }


}
