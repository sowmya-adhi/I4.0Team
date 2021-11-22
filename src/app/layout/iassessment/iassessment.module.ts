import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IassessmentRoutingModule } from './iassessment-routing.module';
import { IassessmentComponent } from './iassessment.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageHeaderModule, StatModule } from '../../shared';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [],
  imports: [
    //BrowserModule,
    CommonModule,
    IassessmentRoutingModule,
    NgxPaginationModule,
    PageHeaderModule,
    StatModule,
    ToastrModule,
    NgbCarouselModule, 
    NgbAlertModule,
    MatButtonModule,
    MatSelectModule ,
    ChartsModule,
    MatButtonToggleModule, 
    MatSlideToggleModule,
    Ng2SearchPipeModule,
    FormsModule,
    TranslateModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyC3TZ4x6gsginru7C9ALiJQSTHtHXWPBHw'
  }) 
  ],
  providers: [{ provide: ToastrService, useValue: ToastrService }]
})
export class IassessmentModule { }
