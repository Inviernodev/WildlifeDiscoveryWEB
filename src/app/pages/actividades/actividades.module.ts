import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesRoutingModule } from './actividades-routing.module';
import { ActividadesComponent } from './actividades.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ActividadesComponent
  ],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    MatButtonModule
  ]
})
export class ActividadesModule { }
