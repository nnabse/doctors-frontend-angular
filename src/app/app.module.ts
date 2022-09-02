import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from '@material/material.module';

import { AuthComponent } from '@pages/auth/auth/auth.component';
import { AuthFormComponent } from '@pages/auth/auth-form/auth-form.component';

import { MainComponent } from '@pages/main/main.component';
import { ReceptionCreateComponent } from '@pages/main/reception-create/reception-create.component';
import { ReceptionsListComponent } from '@pages/main/receptions-list/receptions-list.component';
import { SortingComponent } from '@pages/main/receptions-list/sorting/sorting.component';

import { HeaderComponent } from '@components/header/header.component';

import { AuthGuard } from '@guards/auth.guard';
import { ExitMainGuard } from '@guards/exit-main.guard';

import { RequestsInterceptor } from '@interceptors/token.interceptor';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { ChangeReceptionDialogComponent } from '@components/change-reception-dialog/change-reception-dialog.component';
import { RefreshTokensInterceptor } from '@interceptors/refresh-tokens.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AuthFormComponent,
    AuthComponent,
    ReceptionCreateComponent,
    ReceptionsListComponent,
    DeleteDialogComponent,
    ChangeReceptionDialogComponent,
    SortingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    ExitMainGuard,
    { provide: HTTP_INTERCEPTORS, useClass: RequestsInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokensInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
