import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipleComponent } from './multiple/multiple.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: 'multiple',
    component: MultipleComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
