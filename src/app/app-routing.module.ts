import { SupportChatComponent } from './support-chat/support-chat.component';
import { AuthSuperGuard } from './guard/AuthSuper.guard';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TrainingListComponent} from './training-list/training-list.component';
import {SupportComponent} from './support/support.component';
import {TrainingDetailComponent} from './training-detail/training-detail.component';
import {HttpTesterComponent} from './http-tester/http-tester.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './guard/Auth.guard';
import {ProgressComponent} from './progress/progress.component';
import {ProfileListComponent} from './profile-list/profile-list.component';
import { AuthUserGuard } from './guard/AuthUser.guard';
import {ProfileDetailsComponent} from './profile-details/profile-details.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component: ProfileDetailsComponent, canActivate: [AuthGuard]},
  {path: 'training-list', component: TrainingListComponent, canActivate: [AuthUserGuard]},
  {path: 'support', component: SupportComponent, canActivate: [AuthGuard]},
  {path: 'training-detail', component: TrainingDetailComponent, canActivate: [AuthUserGuard]},
  {path: 'progress/:id', component: ProgressComponent, canActivate: [AuthUserGuard]},
  {path: 'http-tester', component: HttpTesterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'exercise-list', component: ExerciseListComponent, canActivate: [AuthUserGuard]},
  {path: 'profile-list', component: ProfileListComponent, canActivate: [AuthGuard]},
  {path: 'support-chat', component: SupportChatComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
