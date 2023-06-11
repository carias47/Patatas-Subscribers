import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { DashboardSubscribersComponent } from './layouts/dashboard-subscribers/dashboard-subscribers.component';
import { MaterialModule } from '../material/material.module';
import { ListSubscribersComponent } from './pages/list-subscribers/list-subscribers.component';
import { CreateSubscriberComponent } from './pages/create-subscriber/create-subscriber.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditSubscribeComponent } from './pages/edit-subscribe/edit-subscribe.component';
import { DetailSubComponent } from './pages/detail-sub/detail-sub.component';

@NgModule({
  declarations: [
    DashboardSubscribersComponent,
    ListSubscribersComponent,
    CreateSubscriberComponent,
    EditSubscribeComponent,
    DetailSubComponent,
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class SubscribersModule {}
