import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MaterialModule } from '@material/material.module';
import { HomeComponent } from './components/home/home.component';
import { ChatsComponent } from './components/chats/chats.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '@shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ChatsComponent,
    UsersComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MainModule { }
