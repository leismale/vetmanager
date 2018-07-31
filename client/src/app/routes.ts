import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppointmentComponent } from './appointment/appointment.component';

export const routes: Routes = [
  { path:'signup', component: SignupComponent},
  { path:'login', component: LoginComponent},
  { path:'appointment', component: AppointmentComponent},
];
