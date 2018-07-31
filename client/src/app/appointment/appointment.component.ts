import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { AppointmentService } from "../../services/appointment.service";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentComponent implements OnInit {
  public nextDate: any;
  public startAt = new Date();
  public min = new Date();
  public max;
  appointments: any;
  
  getNextDate() {
    //Calculate the limit date of the appointment
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 15);
    this.max = newDate
  }

  public myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(public appointmentService: AppointmentService) {}

  ngOnInit() {this.getNextDate()}

  sendDate(date){
    console.log(date)
    this.appointmentService.sendDate(date).subscribe(appointments => {
      this.appointments = appointments;
      console.log(appointments)
    });
  }

  pickAppointment(appointment, date, timeStart, timeEnd){
    console.log(appointment)
    console.log(date)
    console.log(timeStart)
    console.log(timeEnd)
    this.appointmentService.pickAppointment(appointment, date, timeStart, timeEnd).subscribe();
  }
}
