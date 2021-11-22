import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IassessmentComponent } from './iassessment.component';

const routes: Routes = [
  { path:'', component:IassessmentComponent},
  { path:'iassessment', component:IassessmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IassessmentRoutingModule { }
