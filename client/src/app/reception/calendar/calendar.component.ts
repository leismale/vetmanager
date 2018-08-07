import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "../../../services/appointment.service";
import * as $ from "jquery";
import { RouteConfigLoadStart, Router } from "@angular/router";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent implements OnInit {
  calendarOptions: Object = {
    height: 500,
    fixedWeekCount: false,
    editable: true,
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaDay,agendaFourDay,listMonth"
    },
    eventLimit: true,
    events: "",
    views: {
      agendaFourDay: {
        type: "agenda",
        duration: { days: 5 },
        buttonText: "Week"
      }
    },
    businessHours: {
      dow: [1, 2, 3, 5],
      start: "9:00",
      end: "18:00"
    },
    weekends: false,
    slotDuration: "00:15",
    minTime: "9:00",
    maxTime: "18:30",
    defaultView: "agendaDay"
  };

  constructor(
    public appointmentService: AppointmentService,
    public route: Router
  ) {
    this.getEvents();
  }

  onCalendarInit(initialized: boolean) {
    console.log("Calendar initialized");
  }

  ngOnInit() {}

  getEvents() {
    this.appointmentService
      .getAllAppointments("false")
      .subscribe(appointments => {
        this.calendarOptions["events"] = appointments;
      });
  }
}
