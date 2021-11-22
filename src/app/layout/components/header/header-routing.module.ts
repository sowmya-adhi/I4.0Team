import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertdashboardComponent } from '../../alertdashboard/alertdashboard.component';
import { HeaderComponent } from './header.component';

const routes: Routes = [
  {path : '', component:HeaderComponent},
  {path: 'alert', component: AlertdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
