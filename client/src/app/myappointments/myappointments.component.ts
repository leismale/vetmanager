import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "../../services/appointment.service";
import { SessionService } from "../../services/session.service";

@Component({
  selector: "app-myappointments",
  templateUrl: "./myappointments.component.html",
  styleUrls: ["./myappointments.component.css"]
})
export class MyappointmentsComponent implements OnInit {
  appointments;

  constructor(
    public appointmentService: AppointmentService,
    public sessionService: SessionService
  ) {
    this.appointmentService
      .getMyAppointments(this.sessionService.user)
      .subscribe(appointments => {
        this.appointments = appointments;
        console.log(appointments);
      });
  }

  ngOnInit() {}
}
