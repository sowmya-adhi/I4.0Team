import { Overview360Module } from './layout/overview360/overview360.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';    
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { Constant } from './config/constant';
import { DasboardConstant } from './config/dashboardconstants';
import { HttpService } from './config/http.service';
import { AuthGuard } from './shared';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { MatButtonModule } from '@angular/material/button/';
import { AssetDetailsModule } from './layout/overview360/asset-details/asset-details.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { AlertdashboardModule } from './layout/alertdashboard/alertdashboard.module';
import { IassessmentComponent } from './layout/iassessment/iassessment.component';




@NgModule({
    imports: [
        //CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        ToastrModule,
        NgxPaginationModule,
        NgPipesModule,
        MatButtonModule,
        ChartsModule,
        Overview360Module,
        AssetDetailsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        AgmCoreModule.forRoot({
            apiKey : 'AIzaSyC3TZ4x6gsginru7C9ALiJQSTHtHXWPBHw'
        }),
        MatIconModule,
        MatBadgeModule,
        //IassessmentComponent
    ],
    declarations: [AppComponent],
    
    providers: [
        ThemeService,Constant,
        HttpService,
        DasboardConstant,AuthGuard
                ],
    bootstrap: [AppComponent],
    exports:[NgxPaginationModule]
})
export class AppModule {}
