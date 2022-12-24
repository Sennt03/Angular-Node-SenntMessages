import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallRoutingModule } from './call-routing.module';
import { CallComponent } from './call.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CallComponent
  ],
  imports: [
    CommonModule,
    CallRoutingModule,
    SharedModule
  ]
})
export class CallModule { }
