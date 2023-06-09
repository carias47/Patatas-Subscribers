import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSubscribersComponent } from './layouts/dashboard-subscribers/dashboard-subscribers.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardSubscribersComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribersRoutingModule {}
