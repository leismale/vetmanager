import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "../../../services/appointment.service";

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
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaDay,agendaFourDay,listMonth'
    },
    eventLimit: true, // allow "more" link when too many events
    events: "",
    views: {
      agendaFourDay: {
        type: 'agenda',
        duration: { days: 5 },
        buttonText: 'Week'
      }
    },
    businessHours: {
      dow: [ 1, 2, 3, 5 ],
      start: '9:00',
      end: '18:00',
    },
    weekends: false,
    slotDuration: "00:15",
    minTime: "9:00",
    maxTime: "18:30",
    defaultView: "agendaDay"
    /* [
      {
        title: "All Day Event",
        start: "2018-08-01"
      },
      {
        title: "Long Event",
        start: "2016-09-07",
        end: "2016-09-10"
      }
    ] */
  };

  constructor(public appointmentService: AppointmentService) {
    this.getEvents()
  }

  onCalendarInit(initialized: boolean) {
    console.log("Calendar initialized");
  }

  ngOnInit() {  }

  getEvents(){
    this.appointmentService.getAllAppointments().subscribe(appointments => {
      this.calendarOptions["events"] = appointments;
    })
  }


}
