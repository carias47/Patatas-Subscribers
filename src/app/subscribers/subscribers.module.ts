import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { DashboardSubscribersComponent } from './layouts/dashboard-subscribers/dashboard-subscribers.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [DashboardSubscribersComponent],
  imports: [CommonModule, SubscribersRoutingModule, MaterialModule],
})
export class SubscribersModule {}
