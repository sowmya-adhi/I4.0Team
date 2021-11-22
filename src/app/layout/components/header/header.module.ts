import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { HeaderRoutingModule } from './header-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    MatBadgeModule,
    MatIconModule
  ]
})
export class HeaderModule { }
