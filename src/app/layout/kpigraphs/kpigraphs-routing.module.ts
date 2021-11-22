import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KpigraphsComponent } from './kpigraphs.component';

const routes: Routes = [
  {
    path : '', component : KpigraphsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpigraphsRoutingModule { }
