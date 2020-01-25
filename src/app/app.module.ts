import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { SupportComponent } from './support/support.component';
import { TrainingDetailComponent } from './training-detail/training-detail.component';
import { SuperSetComponent } from './super-set/super-set.component';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import { HttpTesterComponent } from './http-tester/http-tester.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TrainingListComponent,
    SupportComponent,
    TrainingDetailComponent,
    SuperSetComponent,
    HttpTesterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
