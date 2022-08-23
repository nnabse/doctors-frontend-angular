import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from '@pages/auth/auth/auth.component';
import { MainComponent } from '@pages/main/main.component';

import { AuthGuard } from '@guards/auth.guard';
import { ExitMainGuard } from '@guards/exit-main.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'signUp', component: AuthComponent, canActivate: [ExitMainGuard] },
  { path: 'signIn', component: AuthComponent, canActivate: [ExitMainGuard] },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
