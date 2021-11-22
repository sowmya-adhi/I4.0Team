import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetDetailsRoutingModule } from './asset-details-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageHeaderModule, StatModule } from '../../../shared';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AssetDetailsComponent } from './asset-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { TranslateModule } from '@ngx-translate/core';
import { OrderModule } from 'ngx-order-pipe';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [AssetDetailsComponent],
  imports: [
    CommonModule,
    AssetDetailsRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    PageHeaderModule,
    StatModule,
    ToastrModule,
    NgbCarouselModule, 
    NgbAlertModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, 
    ReactiveFormsModule,
    ChartsModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    TranslateModule,
    OrderModule,
    RouterModule,
    MatSortModule

  ],
  providers :[{ provide: ToastrService, useValue: ToastrService},]
})
export class AssetDetailsModule { }
