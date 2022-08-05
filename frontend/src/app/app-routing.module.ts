import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile-component/profile.component';
import { ReportComponent } from './report-component/report.component';
import { LoginComponent } from './user-component/login/login.component';
import { SignupComponent } from './user-component/signup/signup.component';

const USER_ROUTES: Routes = [
  { path : '', redirectTo : 'login', pathMatch : 'full'},
  { path : 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'report', component: ReportComponent },
  { path : 'profile', component: ProfileComponent}
];

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(USER_ROUTES),
  ],

  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
