import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'dashboard', loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'actividad-tiempo', loadComponent: () => import('../../pages/actividades/tiempo-actividad/tiempo-actividad.component').then(m => m.TiempoActividadComponent)
      },
      {
        path: 'actividad-bote', loadComponent: () => import('../../pages/actividades/bote/bote.component').then(m => m.BoteComponent)
      },
      {
        path: 'quiz-basura', loadComponent: () => import('../../pages/actividades/quiz-basura/quiz-basura.component').then(c => c.QuizBasuraComponent)
      },
      {
        path: 'plataformas', loadComponent: () => import('../../pages/actividades/plataformas/plataformas.component').then(c => c.PlataformasComponent)
      },
      {
        path: 'dibujos', loadComponent: () => import('../../pages/actividades/dibujo/dibujo.component').then(c => c.DibujoComponent)
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
