import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './page-routing.module';
import { ConfirmPopupComponent } from './common/confirm-popup/confirm-popup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    ConfirmPopupComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    // DataTablesModule
    SharedModule
  ]
})
export class PageModule { }
