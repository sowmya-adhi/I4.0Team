import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../../shared';
//import { ChatComponent, NotificationComponent, TimelineComponent } from './components';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [CommonModule, NgbCarouselModule, NgbAlertModule, DashboardRoutingModule, StatModule,ToastrModule],
    declarations: [DashboardComponent],
    providers: [{ provide: ToastrService, useValue: ToastrService },]
})
export class DashboardModule {}
