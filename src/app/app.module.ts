import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from '@material/material.module';

import { AuthComponent } from '@pages/auth/auth/auth.component';
import { AuthFormComponent } from '@pages/auth/auth-form/auth-form.component';
import { MainComponent } from '@pages/main/main.component';
import { HeaderComponent } from '@components/header/header.component';

import { AuthGuard } from '@guards/auth.guard';
import { ExitMainGuard } from '@guards/exit-main.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AuthFormComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, ExitMainGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
