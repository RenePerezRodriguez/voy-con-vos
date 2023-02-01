import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { BeneficiosComponent } from './beneficios/beneficios.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    BeneficiosComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    PrimengModule,
    ComponentsModule
  ]
})
export class PagesModule { }
