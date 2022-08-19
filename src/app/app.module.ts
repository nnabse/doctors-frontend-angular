import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from '@material/material.module';

import { SignInComponent } from '@pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@pages/auth/sign-up/sign-up.component';
import { MainComponent } from '@pages/main/main.component';
import { HeaderComponent } from '@components/header/header.component';
import { AuthFormComponent } from './pages/auth/auth-form/auth-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    MainComponent,
    AuthFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
