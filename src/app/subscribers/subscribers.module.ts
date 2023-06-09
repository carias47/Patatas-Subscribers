import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { DashboardSubscribersComponent } from './layouts/dashboard-subscribers/dashboard-subscribers.component';


@NgModule({
  declarations: [
    DashboardSubscribersComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule
  ]
})
export class SubscribersModule { }
