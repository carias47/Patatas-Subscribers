import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { PrivateGuard } from './auth/guards/is-authenticated.guard';
import { PublicGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [PublicGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'subscribers',
    canActivate: [PrivateGuard],
    loadChildren: () =>
      import('./subscribers/subscribers.module').then(
        (m) => m.SubscribersModule
      ),
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
