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
        path: 'actividades', loadChildren: () => import('../../pages/actividades/actividades.module').then(m => m.ActividadesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
