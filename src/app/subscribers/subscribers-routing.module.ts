import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSubscribersComponent } from './layouts/dashboard-subscribers/dashboard-subscribers.component';
import { ListSubscribersComponent } from './pages/list-subscribers/list-subscribers.component';
import { CreateSubscriberComponent } from './pages/create-subscriber/create-subscriber.component';
import { EditSubscribeComponent } from './pages/edit-subscribe/edit-subscribe.component';
import { DetailSubComponent } from './pages/detail-sub/detail-sub.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardSubscribersComponent,
    children: [
      {
        path: 'list-subscribers',
        component: ListSubscribersComponent,
      },
      {
        path: 'new-subscribe',
        component: CreateSubscriberComponent,
      },
      {
        path: 'detail/:id',
        component: DetailSubComponent,
      },
      {
        path: 'edit/:id',
        component: EditSubscribeComponent,
      },
      {
        path: '**',
        redirectTo: 'list-subscribers',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribersRoutingModule {}
