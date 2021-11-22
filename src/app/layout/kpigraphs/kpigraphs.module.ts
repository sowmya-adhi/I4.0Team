import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpigraphsRoutingModule } from './kpigraphs-routing.module';
import { KpigraphsComponent } from './kpigraphs.component';
import { ChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [KpigraphsComponent],
  imports: [
    CommonModule,
    KpigraphsRoutingModule,
    ChartsModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    TranslateModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatDatepickerModule
  ],
  exports : [
    KpigraphsComponent
  ]
})
export class KpigraphsModule { }
