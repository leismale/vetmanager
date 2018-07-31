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
  buttons = [{timeStart:"9:00", cursor:"allowed", background: "green"}, {timeStart:"9:15", cursor:"allowed", background: "green"}, {timeStart:"9:30", cursor:"allowed", background: "green"}, {timeStart:"9:45", cursor:"allowed", background: "green"}, {timeStart:"10:00", cursor:"allowed", background: "green"}];

  getNextDate() {
    //Calculate the limit date of the appointment
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 15);
    this.max = newDate;
  }

  public myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(public appointmentService: AppointmentService) {}

  ngOnInit() {
    this.getNextDate();


  }

  sendDate(date) {
    this.appointmentService.sendDate(date).subscribe(appointments => {
      this.appointments = appointments;
      for (let i = 0; i < this.appointments.length; i++) {
        for (let j = 0; j < this.buttons.length; j++) {
          if (this.buttons[j].timeStart == this.appointments[i].timeStart){
            this.buttons[j].cursor = "not-allowed";
            this.buttons[j].background = "red"
          }
        }
      }
      console.log(appointments);
    });
  }

  pickAppointment(date, timeStart) {
    console.log(date);
    console.log(timeStart);
    this.appointmentService
      .pickAppointment(date, timeStart)
      .subscribe();
  }
}
