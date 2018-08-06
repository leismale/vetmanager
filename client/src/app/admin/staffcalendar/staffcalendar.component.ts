import { Component, OnInit } from "@angular/core";
import { StaffService } from "../../../services/staff.service";

@Component({
  selector: "app-staffcalendar",
  templateUrl: "./staffcalendar.component.html",
  styleUrls: ["./staffcalendar.component.css"]
})
export class StaffcalendarComponent implements OnInit {
  calendarOptions: Object = {
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,listYear'
    },

    displayEventTime: false, // don't show the time column in list view

    // THIS KEY WON'T WORK IN PRODUCTION!!!
    // To make your own Google API key, follow the directions here:
    // http://fullcalendar.io/docs/google_calendar/
    googleCalendarApiKey: "AIzaSyCZGB3FBTqHkpC8VvfFTwlmoWiUcvxN5rE",

    // US Holiday
    events: 'https://www.googleapis.com/calendar/v3/calendars/mt1t5hndp1j78vo7s174sqtsqs@group.calendar.google.com/events?callback=events&key=AIzaSyCZGB3FBTqHkpC8VvfFTwlmoWiUcvxN5rE&singleEvents=true&maxResults=9999',
    /* [
      https://www.googleapis.com/calendar/v3/calendars/mt1t5hndp1j78vo7s174sqtsqs@group.calendar.google.com&key=AIzaSyCZGB3FBTqHkpC8VvfFTwlmoWiUcvxN5rE?start=2018-07-29&end=2018-09-09&_=1533548420219
      https://www.googleapis.com/calendar/v3/calendars/mt1t5hndp1j78vo7s174sqtsqs@group.calendar.google.com/events&key=AIzaSyCZGB3FBTqHkpC8VvfFTwlmoWiUcvxN5rE?start=2018-07-29&end=2018-09-09&_=1533548654174
      https://www.googleapis.com/calendar/v3/calendars/en.usa%23holiday%40group.v.calendar.google.com/events?callback=jQuery33108245836771098642_1533547571773&key=AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE&timeMin=2018-07-28T00%3A00%3A00Z&timeMax=2018-09-10T00%3A00%3A00Z&singleEvents=true&maxResults=9999&_=1533547571774
    ] */


    
  };
  constructor(public staffService: StaffService) {
    this.getEvents();

  }

  onCalendarInit(initialized: boolean) {
    console.log("Calendar initialized");
    
  }

  ngOnInit() {
    console.log(this.calendarOptions)

  }

  getEvents() { //This is going to be holidays
    this.staffService.getAllAppointments().subscribe(appointments => {
      console.log(appointments);
    });
  }
}
