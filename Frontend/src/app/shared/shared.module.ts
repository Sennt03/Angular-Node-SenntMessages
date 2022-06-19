import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniAlertComponent } from './components/mini-alert/mini-alert.component';
import { MaterialModule } from '@material/material.module';
import { CreateDatePipe } from './pipes/create-date.pipe';
import { CreateHourPipe } from './pipes/create-hour.pipe';
import { MessageDirective } from './directives/message.directive';



@NgModule({
  declarations: [
    MiniAlertComponent,
    CreateDatePipe,
    CreateHourPipe,
    MessageDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MiniAlertComponent,
    CreateDatePipe,
    CreateHourPipe,
    MessageDirective
  ]
})
export class SharedModule { }
