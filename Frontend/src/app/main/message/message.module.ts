import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MultipleComponent } from './multiple/multiple.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@NgModule({
  declarations: [
    MessageComponent,
    ScheduleComponent,
    MultipleComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule
  ]
})
export class MessageModule { }
