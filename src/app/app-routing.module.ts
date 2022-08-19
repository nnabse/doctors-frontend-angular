import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from '@pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@pages/auth/sign-up/sign-up.component';
import { MainComponent } from '@pages/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'signUp', pathMatch: 'full' },
  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'main', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
