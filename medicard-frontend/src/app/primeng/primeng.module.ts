import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {TabMenuModule} from 'primeng/tabmenu';

@NgModule({
  
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    ButtonModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    RadioButtonModule,
    SelectButtonModule,
    CascadeSelectModule,
    MenubarModule,
    CardModule,
    DialogModule,
    TabMenuModule
  ]
})
export class PrimengModule { }
