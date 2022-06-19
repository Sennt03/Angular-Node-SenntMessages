import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  exports: [
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatInputModule
  ]
})
export class MaterialModule { }
