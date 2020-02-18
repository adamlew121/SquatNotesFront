import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { SupportComponent } from './support/support.component';
import { TrainingDetailComponent } from './training-detail/training-detail.component';
import { SuperSetComponent } from './super-set/super-set.component';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import { HttpTesterComponent } from './http-tester/http-tester.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {AppService} from './services/app.service';
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './guard/Auth.guard';
import {AlertService} from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    TrainingListComponent,
    SupportComponent,
    TrainingDetailComponent,
    SuperSetComponent,
    HttpTesterComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, AppService, AuthenticationService, AuthGuard, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
