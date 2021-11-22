import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDashboardRoutingModule } from './question-dashboard-routing.module';
import { NewFormModalComponent } from './new-form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionDashboardComponent } from './question-dashboard.component';


@NgModule({
  declarations: [NewFormModalComponent, QuestionDashboardComponent],
  imports: [
    CommonModule,
    //BrowserModule,
    QuestionDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[NewFormModalComponent]
})
export class QuestionDashboardModule { }
