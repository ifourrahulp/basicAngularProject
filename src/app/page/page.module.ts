import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './page-routing.module';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    DataTablesModule
  ]
})
export class PageModule { }
