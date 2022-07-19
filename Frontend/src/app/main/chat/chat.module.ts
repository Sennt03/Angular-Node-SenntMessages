import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@material/material.module';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SharedModule } from '@shared/shared.module';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

// EMOJIS
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    ChatComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    ScrollingModule,
    PickerModule
  ]
})
export class ChatModule { }
