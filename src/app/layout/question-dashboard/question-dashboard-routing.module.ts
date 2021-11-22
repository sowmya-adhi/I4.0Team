import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionDashboardComponent } from './question-dashboard.component';

const routes: Routes = [
  {path:"", component:QuestionDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionDashboardRoutingModule { }
