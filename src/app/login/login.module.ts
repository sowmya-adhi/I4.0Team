import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from 'ng2-charts';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Constant } from '../config/constant';
import { DasboardConstant } from '../config/dashboardconstants';
import { HttpService } from '../config/http.service';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, TranslateModule, LoginRoutingModule, ReactiveFormsModule,FormsModule,ToastrModule],
    declarations: [LoginComponent],
    providers: [
      
        ThemeService,Constant,
       
        HttpService,
        DasboardConstant,ToastrService,
        { provide: ToastrService, useValue: ToastrService },
                ],
})
export class LoginModule {}
