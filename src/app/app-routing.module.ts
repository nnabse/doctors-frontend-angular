import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@pages/auth/auth/auth.component';

import { MainComponent } from '@pages/main/main.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'signUp', component: AuthComponent },
  { path: 'signIn', component: AuthComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
