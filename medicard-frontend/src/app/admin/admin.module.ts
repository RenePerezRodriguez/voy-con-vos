import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeAdminComponent,
    MainAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule
  ]
})
export class AdminModule { }
