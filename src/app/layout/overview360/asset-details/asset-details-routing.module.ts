import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Overview360Component } from '../overview360.component';
import { AssetDetailsComponent } from './asset-details.component';

const routes: Routes = [
  {path : '', component:AssetDetailsComponent},
  {path : 'overview360', component : Overview360Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetDetailsRoutingModule { }
