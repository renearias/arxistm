import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { NameListService } from '../shared/name-list/index';
import { DynamicDataTable } from '../directives/index'

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent, DynamicDataTable],
  exports: [HomeComponent],
  providers: [NameListService]
})
export class HomeModule { }
