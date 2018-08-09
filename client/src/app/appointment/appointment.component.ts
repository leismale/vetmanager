import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "../../services/appointment.service";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.css"]
})
export class AppointmentComponent implements OnInit {
  search: string;
  picker: string;
  appointments;

  public nextDate: any;
  public startAt = new Date();
  public min = new Date();
  public max;
  public popoverTitle: string = "Confirm the appointment";
  public popoverMessage: string = "Click confirm to book this appointment or cancel to choose another one";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  buttons = [
    {
      start: "9:00",
      end: "9:15",
      cursor: "allowed",
      background: "#95C03D",
      value: "9"
    },
    {
      start: "9:15",
      end: "9:30",
      cursor: "allowed",
      background: "#95C03D",
      value: "9.25"
    },
    {
      start: "9:30",
      end: "9:45",
      cursor: "allowed",
      background: "#95C03D",
      value: "9.5"
    },
    {
      start: "9:45",
      end: "10:00",
      cursor: "allowed",
      background: "#95C03D",
      value: "9.75"
    },
    {
      start: "10:00",
      end: "10:15",
      cursor: "allowed",
      background: "#95C03D",
      value: "10"
    }
  ];

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

  getAppointments(date) {
    this.appointmentService.getAppointments(date).subscribe(appointments => {
      this.appointments = appointments;
      this.update();
    });
  }

  update() {
    this.buttons.forEach(e => {
      e.cursor = "pointer";
      e.background = "#95C03D";
    });
    for (let i = 0; i < this.appointments["length"]; i++) {
      let button = this.buttons.find(
        e => e.start == this.appointments[i].startTime
      );
      if (button) {
        button.cursor = "not-allowed";
        button.background = "#C82333";
      }
    }
  }

  pickAppointment(date, startTime, value) {
    let timeZoneDifference = Number(value) + 2; //Add 2 hours because of the timezone time difference
    let start = new Date(date.getTime() + timeZoneDifference * 60 * 60 * 1000); //Add the time to the date
    let end = new Date(start.getTime() + 15 * 60 * 1000); //Add 15min to the start time
    this.appointmentService
      .pickAppointment(date, start, startTime, end)
      .subscribe(res => {
        this.appointments.push(res);
        this.getAppointments(date);
        this.update();
      });
  }
}
