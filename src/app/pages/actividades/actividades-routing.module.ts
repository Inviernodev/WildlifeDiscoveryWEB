import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './actividades.component';

const routes: Routes = [
  {
    path: '',
    component: ActividadesComponent,
    children: [
      {
        path: 'quiz-basura', loadComponent: () => import('./quiz-basura/quiz-basura.component').then(c => c.QuizBasuraComponent)
      },
      {
        path: 'dibujo', loadComponent: () => import('./dibujo/dibujo.component').then(c => c.DibujoComponent)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesRoutingModule { }
