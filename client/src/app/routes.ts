import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MypetsComponent } from './mypets/mypets.component';
import { ReceptionComponent } from './reception/reception.component';
import { NewpetComponent } from './reception/newpet/newpet.component';
import { DetailsComponent } from './reception/details/details.component';
import { AdminComponent } from './admin/admin.component';
import { AppointmentdetailsComponent } from './reception/appointmentdetails/appointmentdetails.component';
import { NewstaffComponent } from './admin/newstaff/newstaff.component';
import { StockComponent } from './admin/stock/stock.component';
import { VetComponent } from './vet/vet.component';

export const routes: Routes = [
  { path:'signup', component: SignupComponent},
  { path:'login', component: LoginComponent},
  { path:'appointment', component: AppointmentComponent},
  { path:'mypets', component: MypetsComponent},
  { path:'reception', component: ReceptionComponent},
  { path:'newpet', component: NewpetComponent},
  { path:'details/:id', component: DetailsComponent},
  { path:'admin', component: AdminComponent},
  { path:'appointmentdetails/:id', component: AppointmentdetailsComponent},
  { path:'newstaff', component: NewstaffComponent},
  { path:'stock', component: StockComponent},
  { path:'vet', component: VetComponent}
];
