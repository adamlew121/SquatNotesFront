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
import { ProgressComponent } from './progress/progress.component';
import { ProgressChartComponent } from './progress-chart/progress-chart.component';
import {ChartsModule} from 'ng2-charts';
import {ProgressService} from './services/progress.service';
import {TrainingService} from './services/training.service';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';

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
    ProgressComponent,
    ProgressChartComponent,
    ProfilePhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [HttpService, ProgressService, TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
