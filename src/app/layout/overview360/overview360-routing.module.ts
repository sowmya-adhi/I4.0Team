import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { Overview360Component } from './overview360.component';

const routes: Routes = [
  { path:'', component:Overview360Component},
  { path:'overview360', component:Overview360Component},
  { path:'asset_details', component:AssetDetailsComponent},
  { path: 'asset_overview', component:AssetDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Overview360RoutingModule { }
