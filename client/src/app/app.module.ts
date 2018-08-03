import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterModule } from "../../node_modules/@angular/router";
import { routes } from "./routes";
import { FormsModule } from "@angular/forms";
import { SessionService } from "../services/session.service";
import { HttpModule } from "@angular/http";
import { AppointmentComponent } from "./appointment/appointment.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppointmentService } from "../services/appointment.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { MypetsComponent } from "./mypets/mypets.component";
import { ReceptionComponent } from "./reception/reception.component";
import { CalendarComponent } from "./reception/calendar/calendar.component";
import { AppointmentsComponent } from "./reception/appointments/appointments.component";
import { FilterPipe } from "./pipe/filter.pipe";
import { NewpetComponent } from "./reception/newpet/newpet.component";
import { PetService } from "../services/pet.service";
import { CustomerService } from "../services/customer.service";
import { SearchComponent } from "./reception/search/search.component";
import { DetailsComponent } from "./reception/details/details.component";
import { CalendarModule } from "ap-angular-fullcalendar";
import * as $ from "jquery";
import { AdminComponent } from "./admin/admin.component";
import { AppointmentdetailsComponent } from "./reception/appointmentdetails/appointmentdetails.component";
import { StaffComponent } from './admin/staff/staff.component';
import { NewstaffComponent } from './admin/newstaff/newstaff.component';
import { StaffcalendarComponent } from './admin/staffcalendar/staffcalendar.component';
import { StockComponent } from './admin/stock/stock.component';
import { StaffService } from "../services/staff.service";
import { VetComponent } from './vet/vet.component';
import { CustomerComponent } from "./customer/customer.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AppointmentComponent,
    MypetsComponent,
    ReceptionComponent,
    CalendarComponent,
    AppointmentsComponent,
    FilterPipe,
    NewpetComponent,
    SearchComponent,
    DetailsComponent,
    AdminComponent,
    AppointmentdetailsComponent,
    StaffComponent,
    NewstaffComponent,
    StaffcalendarComponent,
    StockComponent,
    VetComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger" // set defaults here
    }),
    CalendarModule
  ],
  providers: [SessionService, AppointmentService, PetService, CustomerService, StaffService],
  bootstrap: [AppComponent]
})
export class AppModule {}
