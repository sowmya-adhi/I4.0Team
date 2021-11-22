import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDashboardRoutingModule } from './question-dashboard-routing.module';
import { NewFormModalComponent } from './new-form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionDashboardComponent } from './question-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewOptionsComponent } from './view-options.component';


@NgModule({
  declarations: [NewFormModalComponent, QuestionDashboardComponent, ViewOptionsComponent],
  imports: [
    CommonModule,
    //BrowserModule,
    QuestionDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  entryComponents:[NewFormModalComponent,ViewOptionsComponent]
})
export class QuestionDashboardModule { }
