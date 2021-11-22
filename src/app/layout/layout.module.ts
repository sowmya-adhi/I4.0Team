import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { AlertdashboardComponent } from './alertdashboard/alertdashboard.component';
import { IassessmentComponent } from './iassessment/iassessment.component';
import { FormComponent } from './form/form.component';
import { DetailsComponent } from './details/details.component';
import { ReadinessOrgComponent } from './readiness-org/readiness-org.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ResultComponent } from './result/result.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tier1admindashboardComponent } from './tier1admindashboard/tier1admindashboard.component';
import { QuestionDashboardComponent } from './question-dashboard/question-dashboard.component';

@NgModule({
    imports: [ ReactiveFormsModule, FormsModule, CommonModule, LayoutRoutingModule, TranslateModule, NgbDropdownModule,ToastrModule,MatBadgeModule,MatIconModule],
    declarations: [LayoutComponent, HeaderComponent, FooterComponent, ReadinessOrgComponent,DetailsComponent, FormComponent, IassessmentComponent, AdmindashboardComponent, ResultComponent, Tier1admindashboardComponent, QuestionDashboardComponent ],
    providers: [{ provide: ToastrService, useValue: ToastrService },]
})
export class LayoutModule {}
