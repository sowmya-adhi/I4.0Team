import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tier1admindashboardComponent } from './tier1admindashboard.component';
import { Tier1admindashboardRoutingModule } from './tier1admindashboard-routing.module';
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
import { QuestionDashboardComponent } from '../question-dashboard/question-dashboard.component';
import { QuestionDashboardRoutingModule } from '../question-dashboard/question-dashboard-routing.module';
@NgModule({
  declarations: [],
  imports: [
    //QuestionDashboardRoutingModule,
    CommonModule,
    Tier1admindashboardRoutingModule,
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
export class Tier1admindashboardModule { }
