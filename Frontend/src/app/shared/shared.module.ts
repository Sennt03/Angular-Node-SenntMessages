import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniAlertComponent } from './components/mini-alert/mini-alert.component';
import { MaterialModule } from '@material/material.module';
import { CreateDatePipe } from './pipes/create-date.pipe';
import { CreateHourPipe } from './pipes/create-hour.pipe';
import { MessageDirective } from './directives/message.directive';
import { ContactInfoModalComponent } from './components/contact-info-modal/contact-info-modal.component';
import { IncomingCallComponent } from './components/incoming-call/incoming-call.component';
import { InputComponent } from './components/input/input.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateUrlPipe } from './pipes/create-url.pipe';
import { LocationPipe } from './pipes/location.pipe';
import { SizePipe } from './pipes/size.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';



@NgModule({
  declarations: [
    MiniAlertComponent,
    CreateDatePipe,
    CreateHourPipe,
    MessageDirective,
    ContactInfoModalComponent,
    IncomingCallComponent,
    InputComponent,
    SettingsComponent,
    CreateUrlPipe,
    LocationPipe,
    SizePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    PickerModule
  ],
  exports: [
    MiniAlertComponent,
    CreateDatePipe,
    CreateHourPipe,
    MessageDirective,
    SettingsComponent,
    InputComponent,
    CreateUrlPipe,
    SizePipe,
    LocationPipe,
    ContactInfoModalComponent
  ]
})
export class SharedModule { }
