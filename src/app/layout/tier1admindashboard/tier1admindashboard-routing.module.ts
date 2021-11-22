import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tier1admindashboardComponent } from './tier1admindashboard.component';
const routes: Routes = [
  { path:'', component:Tier1admindashboardComponent},
  { path:'admin-dashboard', component:Tier1admindashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tier1admindashboardRoutingModule { }
