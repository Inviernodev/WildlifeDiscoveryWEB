import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    RouterModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
