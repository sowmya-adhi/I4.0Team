import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertdashboardRoutingModule } from './alertdashboard-routing.module';
import { AlertdashboardComponent } from './alertdashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSortModule} from '@angular/material/Sort';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AlertdashboardComponent],
  imports: [
    CommonModule,
    AlertdashboardRoutingModule,
    TranslateModule,
    ChartsModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatDatepickerModule,
    ChartsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatSortModule,
    NgxSpinnerModule
    
  ]
})
export class AlertdashboardModule { }
