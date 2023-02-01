import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroTarjetaComponent } from './registro-tarjeta/registro-tarjeta.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistroTarjetaComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule
  ],
  exports:[
    RegistroTarjetaComponent
  ]
})
export class ComponentsModule { }
