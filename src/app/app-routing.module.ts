import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {TrainingListComponent} from './training-list/training-list.component';
import {SupportComponent} from './support/support.component';
import {TrainingDetailComponent} from './training-detail/training-detail.component';
import {HttpTesterComponent} from './http-tester/http-tester.component';

const routes: Routes = [
  {path:  '', pathMatch:  'full', redirectTo:  'home'},
  {path: 'home', component: HomeComponent},
  {path: 'training-list', component: TrainingListComponent},
  {path: 'support', component: SupportComponent},
  {path: 'training-detail', component: TrainingDetailComponent},
  {path: 'http-tester', component: HttpTesterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
