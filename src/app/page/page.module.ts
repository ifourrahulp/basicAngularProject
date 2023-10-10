import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './page-routing.module';
import { ConfirmPopupComponent } from './common/confirm-popup/confirm-popup.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditRecordComponent } from './add-edit-record/add-edit-record.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    ConfirmPopupComponent,
    AddEditRecordComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PageModule { }
